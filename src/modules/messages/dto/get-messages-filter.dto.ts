import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional } from 'class-validator';
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
