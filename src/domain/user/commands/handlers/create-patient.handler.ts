import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreatePatientCommand } from '../impl/create-patient.command';

@CommandHandler(CreatePatientCommand)
export class CreatePatientHandler
  implements ICommandHandler<CreatePatientCommand>
{
  constructor(private readonly publisher: EventPublisher) {}

  async execute(command: CreatePatientCommand) {
    const { patient } = command;
    console.log(patient);
  }
}
