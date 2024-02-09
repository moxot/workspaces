import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsDate } from 'class-validator';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';
import { Type } from 'class-transformer';

export class CreateMessageDto {
  @ApiProperty()
  @IsMongoId()
  @TransformMongoId()
  workspaceId: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty()
  @IsString()
  content: string;
}
