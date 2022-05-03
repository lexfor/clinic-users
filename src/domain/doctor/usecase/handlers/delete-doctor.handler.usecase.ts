import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from "@nestjs/common";
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IDoctorRepository } from '../../interfaces/repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { DeleteDoctorCommandUsecase } from '../commands/delete-doctor.command.usecase';

@CommandHandler(DeleteDoctorCommandUsecase)
export class DeleteDoctorHandlerUsecase
  implements ICommandHandler<DeleteDoctorCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('DOCTOR_REPOSITORY') private readonly doctorRepository: IDoctorRepository,
    ) {}

  async execute(command: DeleteDoctorCommandUsecase): Promise<void> {
    const doctor = await this.doctorRepository.getDoctor(command.id);
    await this.doctorRepository.deleteDoctor(command.id);

    this.client.emit('delete.doctor', {
      actionID: uuidv4(),
      userID: doctor.getUserID,
      doctorID: command.id,
    });
  }
}
