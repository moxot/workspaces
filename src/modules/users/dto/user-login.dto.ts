import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;
}

@Exclude()
export class UserLoginDtoResult {
  @Expose()
  @ApiResponseProperty()
  @IsString()
  token: string;

  @Expose()
  @ApiResponseProperty()
  @IsString()
  refresh: string;
}
