import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsString } from 'class-validator';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';
import { Exclude, Expose, Type } from 'class-transformer';
import { GetWorkspaceAggregateDto } from '../../workspaces/dto/get-workspace-aggregate.dto';

export class GetUserDto {
  @ApiProperty()
  @IsBoolean()
  @Type(() => Boolean)
  aggregate: boolean;
}
@Exclude()
export class GetUserDtoResult {
  @Expose()
  @ApiResponseProperty()
  @IsMongoId()
  @TransformMongoId()
  _id: string;

  @Expose()
  @ApiResponseProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiResponseProperty()
  @IsString()
  login: string;
}

@Exclude()
export class GetUserAggregateDtoResult {
  @Expose()
  @ApiResponseProperty()
  @IsMongoId()
  @TransformMongoId()
  _id: string;

  @Expose()
  @ApiResponseProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiResponseProperty()
  @IsString()
  login: string;

  @Expose()
  @ApiResponseProperty()
  @Type(() => GetWorkspaceAggregateDto)
  workspaces: GetWorkspaceAggregateDto[];
}
