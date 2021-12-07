import { CreateFullUserDto } from '../../dto/create-fullUser.dto';

export class CreatePatientCommand {
  constructor(public readonly patient: CreateFullUserDto) {}
}
