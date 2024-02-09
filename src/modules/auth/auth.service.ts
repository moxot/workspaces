import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { plainToInstance } from 'class-transformer';
import { UserRefreshTokenDtoResult } from '../users/dto/user-refresh-token.dto';
import { UsersService } from '../users/users.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private redisService: RedisService,
  ) {}

  async login(login: string, password: string) {
    const user = await this.usersService.find({ login });
    if (!user) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    if (!(await argon2.verify(user.password, password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    const userId = String(user._id);
    const token = this.jwtService.sign(
      { userId: userId },
      { expiresIn: process.env.ACCESS_TOKEN_TTL },
    );
    const refreshToken = this.jwtService.sign(
      { userId: userId },
      { expiresIn: process.env.REFRESH_TOKEN_TTL },
    );
    await this.redisService.set(`refresh_${refreshToken}`, userId, +process.env.REFRESH_TOKEN_TTL);
    return { token, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    const userId = await this.redisService.get(`refresh_${refreshToken}`);
    if (!userId) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    await this.redisService.del(`refresh_${refreshToken}`);
    const newRefreshToken = await this.jwtService.sign(
      { userId: userId },
      { expiresIn: +process.env.ACCESS_TOKEN_TTL },
    );
    await this.redisService.set(
      `refresh_${newRefreshToken}`,
      userId,
      +process.env.REFRESH_TOKEN_TTL,
    );
    return plainToInstance(UserRefreshTokenDtoResult, { token: newRefreshToken });
  }

  async logout(refreshToken: string) {
    await this.redisService.del(`refresh_${refreshToken}`);
  }
}
