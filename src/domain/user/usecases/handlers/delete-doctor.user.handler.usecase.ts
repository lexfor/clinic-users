import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IUserRepository } from '../../interfaces/repository.interface';
import { Inject } from '@nestjs/common';
import { DeleteDoctorUserCommandUsecase } from '../commands';

@CommandHandler(DeleteDoctorUserCommandUsecase)
export class DeleteDoctorUserHandlerUsecase
  implements ICommandHandler<DeleteDoctorUserCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {
  }

  async execute(command: DeleteDoctorUserCommandUsecase): Promise<void> {
    const user = await this.userRepository.getUserByID(command.id);

    await this.userRepository.deleteUser(command.id);

    this.client.emit('delete.doctor.user', {
      actionID: command.actionID,
      userID: user.getID,
      credentialID: user.getCredentialID,
    });
  }
}
