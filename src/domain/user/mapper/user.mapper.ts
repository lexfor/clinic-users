import { IUser } from '../interfaces/user.interface';
import { UserEntity } from '../entity/user.entity';

export class UserMapper {
  toEntity(user: IUser): UserEntity {
    return new UserEntity(
      user.first_name,
      user.last_name,
      user.gender,
      user.address,
      user.birthday,
      user.credential_id,
      user.id,
      user.photo,
    );
  }

  toRow(user: UserEntity): IUser {
    return {
      id: user.getID,
      first_name: user.getFirstName,
      last_name: user.getLastName,
      gender: user.getGender,
      address: user.getAddress,
      birthday: user.getBirthday,
      photo: user.getPhoto,
      credential_id: user.getCredentialID,
    };
  }
}
