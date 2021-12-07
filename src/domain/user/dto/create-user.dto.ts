import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator';
import { LoginCredentialsDto } from '../../credentials/dto/login-credentials.dto';

export class CreateUserDto extends LoginCredentialsDto {
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
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
