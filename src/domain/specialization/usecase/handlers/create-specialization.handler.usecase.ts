import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from "@nestjs/common";
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { v4 as uuidv4 } from 'uuid';
import { CreateSpecializationCommandUsecase } from '../commands/create-specialization.command.usecase';
import { ISpecializationRepository } from '../../interfaces/repository.interface';
import { ISpecialization } from '../../interfaces/specialization.interface';

@CommandHandler(CreateSpecializationCommandUsecase)
export class CreateSpecializationHandlerUsecase
  implements ICommandHandler<CreateSpecializationCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('SPECIALIZATION_REPOSITORY') private readonly specializationRepository: ISpecializationRepository,
    ) {}

  async execute(command: CreateSpecializationCommandUsecase): Promise<void> {
    const specialization: ISpecialization = {
      id: uuidv4(),
      name: command.name,
    }

    await this.specializationRepository.createSpecialization(specialization);

    this.client.emit('create.specialization', {
      actionID: uuidv4(),
      doctorID: specialization.id,
    });
  }
}
