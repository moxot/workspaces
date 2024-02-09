import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';
import { UsersService } from './users.service';
import { GetUserAggregateDto } from './dto/get-user-aggregate.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(public readonly service: UsersService) {}

  @ApiOperation({ summary: 'Get users with pagination and filters' })
  @ApiOkResponse({ type: User })
  @Get('/:id')
  async updateOne(@Param('id') userId: string): Promise<GetUserAggregateDto> {
    return this.service.findOne(userId);
  }
}
