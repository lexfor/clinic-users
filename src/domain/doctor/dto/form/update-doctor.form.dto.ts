import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorFormDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly firstName?: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly lastName?: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly gender?: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly address?: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly birthday?: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly cabinet?: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly position?: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly specializationID?: string;
}
