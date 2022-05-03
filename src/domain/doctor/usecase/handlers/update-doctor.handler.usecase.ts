import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from "@nestjs/common";
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IDoctorRepository } from '../../interfaces/repository.interface';
import { IDoctor } from '../../interfaces/doctor.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdateDoctorCommandUsecase } from '../commands/update-doctor.command.usecase';
import { DoctorEntity } from '../../entity/doctor.entity';
import { DoctorMapper } from '../../mapper/doctor.mapper';

@CommandHandler(UpdateDoctorCommandUsecase)
export class UpdateDoctorHandlerUsecase
  implements ICommandHandler<UpdateDoctorCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('DOCTOR_REPOSITORY') private readonly doctorRepository: IDoctorRepository,
    private readonly doctorMapper: DoctorMapper,
    ) {}

  async execute(command: UpdateDoctorCommandUsecase): Promise<void> {
    const doctor: DoctorEntity = await this.doctorRepository.getDoctor(command.id);

    const updatedDoctor: IDoctor = this.doctorMapper.toRow(doctor);

    if(command.cabinet) {
      updatedDoctor.cabinet = command.cabinet;
    }

    if(command.position) {
      updatedDoctor.position = command.position;
    }

    if(command.specializationID) {
      updatedDoctor.specialization_id = command.specializationID;
    }

    await this.doctorRepository.updateDoctor(updatedDoctor);

    this.client.emit('update.doctor', {
      actionID: uuidv4(),
      firstName: command.firstName,
      lastName: command.lastName,
      gender: command.gender,
      address: command.address,
      birthday: command.birthday,
      userID: updatedDoctor.user_id,
      doctorID: updatedDoctor.id,
    });
  }
}
