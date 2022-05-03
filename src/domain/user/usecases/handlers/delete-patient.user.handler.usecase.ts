import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IUserRepository } from '../../interfaces/repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { Inject } from '@nestjs/common';
import { DeletePatientUserCommandUsecase } from '../commands';

@CommandHandler(DeletePatientUserCommandUsecase)
export class DeletePatientUserHandlerUsecase
  implements ICommandHandler<DeletePatientUserCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {
  }

  async execute(command: DeletePatientUserCommandUsecase): Promise<void> {
    const user = await this.userRepository.getUserByID(command.id);

    await this.userRepository.deleteUser(command.id);

    this.client.emit('delete.patient.user', {
      actionID: uuidv4(),
      userID: user.getID,
      credentialID: user.getCredentialID,
    });
  }
}
