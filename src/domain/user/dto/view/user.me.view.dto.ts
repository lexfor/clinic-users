import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserViewDto } from './user.view.dto';

export class UserMeViewDto extends UserViewDto{
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
