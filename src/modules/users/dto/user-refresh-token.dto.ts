import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class UserRefreshTokenDto {
  @ApiProperty()
  @IsString()
  token: string;
}

@Exclude()
export class UserRefreshTokenDtoResult {
  @Expose()
  @ApiResponseProperty()
  @IsString()
  token: string;
}
