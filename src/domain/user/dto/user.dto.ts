import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator';
export class UserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsISO8601()
  @IsNotEmpty()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  credentialID: string;
}
