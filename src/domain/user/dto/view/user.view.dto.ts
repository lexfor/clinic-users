import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserViewDto {
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
  readonly photo: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
