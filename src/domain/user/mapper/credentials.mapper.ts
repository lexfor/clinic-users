import { ICredentials } from '../interfaces/credentials.interface';
import { UserEntity } from '../entity/user.entity';

export class CredentialsMapper {
  toVO(credentials: ICredentials): UserEntity {
    return new UserEntity(
      credentials.login,
      credentials.password,
      credentials.id,
    );
  }

  toRow(credentialsVO: UserEntity): ICredentials {
    return {
      id: credentialsVO.getID,
      login: credentialsVO.getLogin,
      password: credentialsVO.getPassword,
    };
  }
}
