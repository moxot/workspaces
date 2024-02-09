import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.schema';
import { plainToInstance } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { GetUserAggregateDtoResult, GetUserDtoResult } from './dto/get-user.dto';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisService } from '../redis/redis.service';
import { UserRefreshTokenDtoResult } from './dto/user-refresh-token.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const password = await argon2.hash(createUserDto.password);
    const user = new this.userModel({ ...createUserDto, password });
    await user.save();
  }

  async login(login: string, password: string) {
    const user = await this.userModel.findOne({ login }).lean();
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

  async findOne(
    userId: string,
    aggregate: boolean,
  ): Promise<GetUserDtoResult | GetUserAggregateDtoResult> {
    if (!aggregate) {
      const user = this.userModel.findById(userId).lean();
      return plainToInstance(GetUserDtoResult, user);
    }
    const userResult = await this.userModel.aggregate([
      {
        $match: {
          _id: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'workspaces', // Ensure this is the correct collection name
          localField: '_id',
          foreignField: 'user', // Adjusted to match your schema
          as: 'workspaces',
        },
      },
      {
        $unwind: {
          path: '$workspaces',
          preserveNullAndEmptyArrays: true, // Optional, based on your data structure
        },
      },
      {
        $lookup: {
          from: 'messages', // Ensure this is the correct collection name
          localField: 'workspaces._id',
          foreignField: 'workspace', // This should match the reference field in Message schema
          as: 'workspaces.messages',
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          login: { $first: '$login' },
          password: { $first: '$password' },
          workspaces: { $push: '$workspaces' }, // Reconstruct the workspaces array
        },
      },
    ]);
    return plainToInstance(GetUserAggregateDtoResult, userResult[0]);
  }
}
