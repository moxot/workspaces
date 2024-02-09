import { ApiResponseProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsDate, IsNumber } from 'class-validator';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class TextSearchDtoResult {
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
  @IsMongoId()
  @TransformMongoId()
  workspace: string;
}
