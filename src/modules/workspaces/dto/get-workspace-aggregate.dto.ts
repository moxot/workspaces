import { ApiResponseProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { TransformMongoId } from '../../../common/decorators/transform-mongo-id';
import { GetMessageAggregateDto } from '../../messages/dto/get-message-aggregate.dto';

@Exclude()
export class GetWorkspaceAggregateDto {
  @Expose()
  @ApiResponseProperty()
  @IsMongoId()
  @TransformMongoId()
  _id: string;

  @Expose()
  @ApiResponseProperty()
  @IsMongoId()
  @TransformMongoId()
  user: string;

  @Expose()
  @ApiResponseProperty()
  name: string;

  @Expose()
  @ApiResponseProperty()
  @Type(() => GetMessageAggregateDto)
  messages: GetMessageAggregateDto[];
}
