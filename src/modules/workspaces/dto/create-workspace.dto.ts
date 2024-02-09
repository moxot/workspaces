import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty()
  @IsMongoId()
  userId: string;

  @ApiProperty()
  @IsString()
  name: string;
}
