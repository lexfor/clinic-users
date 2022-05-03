import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from "@nestjs/common";
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { CreateDoctorCommandUsecase } from '../commands/create-doctor.command.usecase';
import { IDoctorRepository } from '../../interfaces/repository.interface';
import { IDoctor } from '../../interfaces/doctor.interface';
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateDoctorCommandUsecase)
export class CreateDoctorHandlerUsecase
  implements ICommandHandler<CreateDoctorCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('DOCTOR_REPOSITORY') private readonly doctorRepository: IDoctorRepository,
    ) {}

  async execute(command: CreateDoctorCommandUsecase): Promise<void> {
    const doctor: IDoctor = {
      id: uuidv4(),
      cabinet: command.cabinet,
      position: command.position,
      specialization_id: command.specializationID,
      user_id: command.userID,
    }

    await this.doctorRepository.createDoctor(doctor);

    this.client.emit('create.doctor', {
      actionID: command.actionID,
      doctorID: doctor.id,
    });
  }
}
