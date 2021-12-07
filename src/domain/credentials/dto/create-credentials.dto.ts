import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { LoginCredentialsDto } from './login-credentials.dto';

export class CreateCredentialsDto extends LoginCredentialsDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDateString()
  birthday: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gender: string;
}
