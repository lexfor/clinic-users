import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class FullUserViewDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly gender: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly birthday: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly photo: string;
}
