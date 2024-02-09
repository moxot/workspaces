import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsNumber, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';

@Exclude()
export class GetMessageAggregateDto {
  @Expose()
  @ApiProperty()
  @IsMongoId()
  @TransformMongoId()
  _id: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  likes: number;

  @Expose()
  @ApiProperty()
  @IsString()
  content: string;

  @Expose()
  @ApiProperty()
  @IsDate()
  date: Date;
}
