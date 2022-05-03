import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientKafka, MessagePattern } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { CreatePatientUserCommandUsecase } from '../commands';
import { IUserRepository } from '../../interfaces/repository.interface';
import { Inject } from '@nestjs/common';
import { IUser } from '../../interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_PHOTO_PATH } from '../../../../config/global.env';
import { UserEntity } from '../../entity/user.entity';

@CommandHandler(CreatePatientUserCommandUsecase)
export class CreatePatientUserHandlerUsecase
  implements ICommandHandler<CreatePatientUserCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
  ) {
  }

  @MessagePattern('create.patient.user')
  async execute(command: CreatePatientUserCommandUsecase): Promise<UserEntity> {
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

    const entity = await this.userRepository.createUser(user);
    this.client.emit('create.patient.user', {
      actionID: command.actionID,
      userID: user.id,
    });

    return entity;
  }
}
