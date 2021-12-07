import { ICredentials } from '../interfaces/credentials.interface';
import { CredentialsVO } from '../value objects/credentials.vo';

export class CredentialsMapper {
  toVO(credentials: ICredentials): CredentialsVO {
    return new CredentialsVO(
      credentials.login,
      credentials.password,
      credentials.id,
    );
  }

  toRow(credentialsVO: CredentialsVO): ICredentials {
    return {
      id: credentialsVO.getID,
      login: credentialsVO.getLogin,
      password: credentialsVO.getPassword,
    };
  }
}
