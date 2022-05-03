import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from "@nestjs/common";
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { v4 as uuidv4 } from 'uuid';
import { ISpecializationRepository } from '../../interfaces/repository.interface';
import { DeleteSpecializationCommandUsecase } from '../commands/delete-specialization.command.usecase';

@CommandHandler(DeleteSpecializationCommandUsecase)
export class DeleteSpecializationHandlerUsecase
  implements ICommandHandler<DeleteSpecializationCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('SPECIALIZATION_REPOSITORY') private readonly specializationRepository: ISpecializationRepository,
    ) {}

  async execute(command: DeleteSpecializationCommandUsecase): Promise<void> {
    await this.specializationRepository.deleteSpecialization(command.id);

    this.client.emit('delete.specialization', {
      actionID: uuidv4(),
      doctorID: command.id,
    });
  }
}
