import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { GetWorkspaceAggregateDto } from '../../workspaces/dto/get-workspace-aggregate.dto';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';

@Exclude()
export class GetUserAggregateDto {
  @Expose()
  @ApiProperty()
  @IsMongoId()
  @TransformMongoId()
  _id: string;

  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  login: string;

  @Expose()
  @ApiProperty()
  @Type(() => GetWorkspaceAggregateDto)
  workspaces: GetWorkspaceAggregateDto[];
}
