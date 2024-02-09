import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';

@Exclude()
export class GetMessageAggregateDto {
  @Expose()
  @ApiResponseProperty()
  @IsMongoId()
  @TransformMongoId()
  _id: string;

  @Expose()
  @ApiResponseProperty()
  @IsNumber()
  likes: number;

  @Expose()
  @ApiResponseProperty()
  @IsString()
  content: string;

  @Expose()
  @ApiResponseProperty()
  @IsDate()
  date: Date;
}
