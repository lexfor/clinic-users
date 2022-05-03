import { IsString } from 'class-validator';

export class UpdateUserFormDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;
}