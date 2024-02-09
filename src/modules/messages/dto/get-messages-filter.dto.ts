import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsDate, IsOptional } from 'class-validator';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';
import { Type } from 'class-transformer';

export class GetMessagesFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  likes?: number;
}
