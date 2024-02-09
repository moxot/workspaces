import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';
import { GetMessageAggregateDto } from '../../messages/dto/get-message-aggregate.dto';

@Exclude()
export class GetWorkspaceAggregateDto {
  @Expose()
  @ApiProperty()
  @IsMongoId()
  @TransformMongoId()
  _id: string;

  @Expose()
  @ApiProperty()
  @IsMongoId()
  @TransformMongoId()
  userId: string;

  @Expose()
  @ApiProperty()
  @Type(() => GetMessageAggregateDto)
  messages: GetMessageAggregateDto[];
}
