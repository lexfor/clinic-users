import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateFullUserDto } from './dto/create-fullUser.dto';
import { DEFAULT_PHOTO_PATH, ROLES } from '../../infrastructure/constants';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePatientCommand } from './commands/impl/create-patient.command';

@Controller('api/patients')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  registerPatient(@Body() patient: CreateUserDto) {
    const fullUser: CreateFullUserDto = {
      ...patient,
      role: ROLES.patient,
      photo: DEFAULT_PHOTO_PATH,
    };
    return this.commandBus.execute(new CreatePatientCommand(fullUser));
  }
}
