import { CredentialsVO } from '../value objects/credentials.vo';

export interface ICredentialsRepository {
  createCredentials: (user: CredentialsVO) => Promise<CredentialsVO>;
  getCredentials: (login: string) => Promise<CredentialsVO>;
}
