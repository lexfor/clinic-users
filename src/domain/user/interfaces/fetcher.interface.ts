import { FullUserViewDto } from '../dto/view/full-user.view.dto';
import { UserViewDto } from '../dto/view/user.view.dto';
import { UserEntity } from '../entity/user.entity';

export interface IUserFetcher {
  getFullUsers: () => Promise<FullUserViewDto[]>;
  getMe: (id: string) => Promise<UserViewDto>;
  findByName: (name: string) => Promise<UserEntity[]>;
}
