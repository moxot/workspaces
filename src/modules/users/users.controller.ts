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
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(public readonly service: UsersService) {}

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
