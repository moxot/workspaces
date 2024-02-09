import { Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetUserAggregateDtoResult, GetUserDtoResult } from './dto/get-user.dto';
import { UserLoginDto, UserLoginDtoResult } from './dto/user-login.dto';
import { UserRefreshTokenDto, UserRefreshTokenDtoResult } from './dto/user-refresh-token.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(public readonly service: UsersService) {}

  @Post('/login')
  @HttpCode(200)
  @ApiOkResponse({ type: UserLoginDtoResult })
  async login(@Body() pld: UserLoginDto) {
    return this.service.login(pld.login, pld.password);
  }

  @Post('/refresh-token')
  @HttpCode(200)
  @ApiOkResponse({ type: UserRefreshTokenDtoResult })
  async refreshToken(@Body() pld: UserRefreshTokenDto) {
    return this.service.refreshToken(pld.token);
  }

  @Post('/logout')
  @HttpCode(200)
  @ApiOkResponse()
  async logout(@Body() pld: UserRefreshTokenDto) {
    return this.service.logout(pld.token);
  }

  @ApiOperation({ summary: 'Get user with option to aggregate' })
  @ApiExtraModels(GetUserDtoResult, GetUserAggregateDtoResult)
  @ApiOkResponse({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(GetUserDtoResult) },
        { $ref: getSchemaPath(GetUserAggregateDtoResult) },
      ],
    },
  })
  @Get('/:id')
  async getOneAggregate(
    @Param('id') userId: string,
    @Query('aggregate') aggregate: boolean,
  ): Promise<GetUserDtoResult | GetUserAggregateDtoResult> {
    return this.service.findOne(userId, aggregate);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }
}
