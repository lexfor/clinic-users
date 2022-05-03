import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateSpecializationFormDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
