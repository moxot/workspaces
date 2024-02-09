import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class CreateWorkspaceDto {
  @ApiProperty()
  @IsMongoId()
  @Type(() => ObjectId)
  userId: ObjectId;

  @ApiProperty()
  @IsString()
  name: string;
}
