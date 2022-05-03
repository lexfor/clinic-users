import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IUserFetcher } from '../interfaces/fetcher.interface';
import { UserMeViewDto } from '../dto/view/user.me.view.dto';
import { UpdateUserFormDto } from '../dto/form/update-user.form.dto';
import { UpdateUserCommandUsecase } from '../usecases/commands/update-user.command.usecase';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    private commandBus: CommandBus,
    @Inject('USER_FETCHER') private userFetcher: IUserFetcher,
  ) {
  }

  async getMe(id: string, role: string): Promise<UserMeViewDto>{
    const user = await this.userFetcher.getMe(id);
    return {
      ...user,
      role: role,
    }
  }

  async updateMe(id: string, dto: UpdateUserFormDto): Promise<void>{
    await this.commandBus.execute(new UpdateUserCommandUsecase(id, dto))
  }

  async findPatient(name: string): Promise<UserEntity[]>{
    return await this.userFetcher.findByName(name);
  }
}
