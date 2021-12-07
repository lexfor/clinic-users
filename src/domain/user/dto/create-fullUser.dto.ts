import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateFullUserDto extends CreateUserDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  role: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  photo: string;
}
