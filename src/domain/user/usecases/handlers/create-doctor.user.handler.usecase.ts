import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IUserRepository } from '../../interfaces/repository.interface';
import { Inject } from '@nestjs/common';
import { IUser } from '../../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_PHOTO_PATH } from '../../../../config/global.env';
import { CreateDoctorUserCommandUsecase } from '../commands';

@CommandHandler(CreateDoctorUserCommandUsecase)
export class CreateDoctorUserHandlerUsecase
  implements ICommandHandler<CreateDoctorUserCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {
  }

  async execute(command: CreateDoctorUserCommandUsecase): Promise<void> {
    const user: IUser = {
      id: uuidv4(),
      first_name: command.firstName,
      last_name: command.lastName,
      birthday: command.birthday,
      gender: command.gender,
      address: command.address,
      photo: DEFAULT_PHOTO_PATH,
      credential_id: command.credentialID,
    }

    await this.userRepository.createUser(user);

    this.client.emit('create.doctor.user', {
      actionID: command.actionID,
      userID: user.id,
      cabinet: command.cabinet,
      position: command.position,
      specializationID: command.specializationID,
    });
  }
}
