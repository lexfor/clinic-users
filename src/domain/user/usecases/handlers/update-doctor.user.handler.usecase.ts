import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { IUserRepository } from '../../interfaces/repository.interface';
import { Inject } from '@nestjs/common';
import { UpdateDoctorUserCommandUsecase } from '../commands';
import { UserMapper } from '../../mapper/user.mapper';

@CommandHandler(UpdateDoctorUserCommandUsecase)
export class UpdateDoctorUserHandlerUsecase
  implements ICommandHandler<UpdateDoctorUserCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: IUserRepository,
    private readonly userMapper: UserMapper,
  ) {
  }

  async execute(command: UpdateDoctorUserCommandUsecase): Promise<void> {
    const user = await this.userRepository.getUserByID(command.id);

    const updatedUser = this.userMapper.toRow(user);

    if(command.firstName) {
      updatedUser.first_name = command.firstName;
    }

    if(command.lastName) {
      updatedUser.last_name = command.lastName;
    }

    if(command.birthday) {
      updatedUser.birthday = command.birthday;
    }

    if(command.address) {
      updatedUser.address = command.address;
    }

    if(command.gender) {
      updatedUser.gender = command.gender;
    }

    console.log(updatedUser);

    await this.userRepository.updateUser(updatedUser);

    this.client.emit('update.doctor.user', {
      actionID: command.actionID,
      userID: updatedUser.id,
    });
  }
}
