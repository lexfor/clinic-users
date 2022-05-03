import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IUserRepository } from '../../interfaces/repository.interface';
import { Inject } from '@nestjs/common';
import { IUser } from '../../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_PHOTO_PATH } from '../../../../config/global.env';
import { CreateDoctorUserCommandUsecase } from '../commands';
import { UpdateUserCommandUsecase } from '../commands/update-user.command.usecase';

@CommandHandler(UpdateUserCommandUsecase)
export class UpdateUserHandlerUsecase
  implements ICommandHandler<UpdateUserCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {
  }

  async execute(command: UpdateUserCommandUsecase): Promise<void> {

    const user = await this.userRepository.getUserByCredentialID(command.id);

    const updatedUser: IUser = {
      id: user.getID,
      first_name: command.firstName,
      last_name: command.lastName,
      birthday: user.getBirthday,
      gender: user.getGender,
      address: user.getAddress,
      photo: user.getPhoto,
      credential_id: user.getCredentialID,
    }

    console.log(updatedUser);

    await this.userRepository.updateUser(updatedUser);

    this.client.emit('update.user', {
      actionID: uuidv4(),
      userID: user.getID,
    });
  }
}
