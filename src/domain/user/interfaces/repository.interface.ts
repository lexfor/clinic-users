import { UserEntity } from '../entity/user.entity';

export interface ICredentialsRepository {
  createCredentials: (user: UserEntity) => Promise<UserEntity>;
  getCredentials: (login: string) => Promise<UserEntity>;
}
