import { IUser } from '../interfaces/user.interface';
import { UserEntity } from '../entity/user.entity';

export class UserMapper {
  toEntity(user: IUser): UserEntity {
    return new UserEntity(
      user.firstName,
      user.lastName,
      user.gender,
      user.birthday,
      user.photo,
      user.role,
      user.id,
    );
  }

  toRow(user: UserEntity): IUser {
    return {
      id: user.getID,
      firstName: user.getFirstName,
      lastName: user.getLastName,
      gender: user.getGender,
      birthday: user.getBirthday,
      photo: user.getPhoto,
      role: user.getRole,
    };
  }
}
