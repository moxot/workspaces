import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDto, UserLoginDtoResult } from '../users/dto/user-login.dto';
import {
  UserRefreshTokenDto,
  UserRefreshTokenDtoResult,
} from '../users/dto/user-refresh-token.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}
  @Post('/login')
  @HttpCode(200)
  @ApiOkResponse({ type: UserLoginDtoResult })
  async login(@Body() pld: UserLoginDto) {
    return this.authService.login(pld.login, pld.password);
  }

  @Post('/refresh-token')
  @HttpCode(200)
  @ApiOkResponse({ type: UserRefreshTokenDtoResult })
  async refreshToken(@Body() pld: UserRefreshTokenDto) {
    return this.authService.refreshToken(pld.token);
  }

  @Post('/logout')
  @HttpCode(200)
  @ApiOkResponse()
  async logout(@Body() pld: UserRefreshTokenDto) {
    return this.authService.logout(pld.token);
  }
}
