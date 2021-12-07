import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentialsDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  login: string;

  @Length(6, 50)
  @IsString()
  @ApiProperty()
  password: string;
}