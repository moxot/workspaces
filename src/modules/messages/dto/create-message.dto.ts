import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsDate, IsNumber } from 'class-validator';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';
import { Exclude, Expose, Type } from 'class-transformer';
import { Workspace } from '../../workspaces/workspace.schema';

export class CreateMessageDto {
  @ApiProperty()
  @IsMongoId()
  @TransformMongoId()
  workspace: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsString()
  content: string;
}

@Exclude()
export class CreateMessageDtoResult {
  @Expose()
  @ApiResponseProperty()
  @IsMongoId()
  @TransformMongoId()
  _id: string;

  @Expose()
  @ApiResponseProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @Expose()
  @ApiResponseProperty()
  @IsString()
  content: string;

  @Expose()
  @ApiResponseProperty()
  @IsNumber()
  likes: number;

  @Expose()
  @ApiResponseProperty()
  @Type(() => Workspace)
  workspace: Workspace;
}
