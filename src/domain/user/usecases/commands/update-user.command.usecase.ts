import { UpdateUserFormDto } from '../../dto/form/update-user.form.dto';

export class UpdateUserCommandUsecase {
  id: string;

  firstName: string;

  lastName: string;

  constructor(
    id: string,
    dto: UpdateUserFormDto,
    ) {
    this.id = id;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
  }
}
