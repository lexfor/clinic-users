import { UserEntity } from '../entity/user.entity';
import { IUser } from './user.interface';

export interface IUserRepository {
  createUser: (user: IUser) => Promise<UserEntity>;
  updateUser: (user: IUser) => Promise<UserEntity>;
  getUserByCredentialID: (id: string) => Promise<UserEntity>;
  getUserByID: (id: string) => Promise<UserEntity>;
  deleteUser: (id: string) => Promise<void>;
}
