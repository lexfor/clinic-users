import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ICredentials } from './interfaces/credentials.interface';
import { ICredentialsRepository } from './interfaces/repository.interface';
import { CredentialsMapper } from './mapper/credentials.mapper';
import { CredentialsVO } from './value objects/credentials.vo';
import { Cache } from 'cache-manager';
import { delay, end, start } from '../../infrastructure/timer';
import { CustomLogger } from '../../infrastructure/logger/CustomLogger';

@Injectable()
export class CredentialsRepository implements ICredentialsRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly logger: CustomLogger,
    private readonly mapper: CredentialsMapper,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.logger.setContext('Resolution repository');
  }
  async createCredentials(
    credentialsVO: CredentialsVO,
  ): Promise<CredentialsVO> {
    start();
    const credentials: ICredentials = this.mapper.toRow(credentialsVO);
    const sql = `INSERT INTO credentials (id, login, password) VALUES
                 ($1, $2, $3);`;
    await this.pool.query(sql, [
      credentials.id,
      credentials.login,
      credentials.password,
    ]);
    end();
    this.logger.log(`create user time: ${delay()}ms`);
    return credentialsVO;
  }

  async getCredentials(login: string): Promise<CredentialsVO> {
    start();
    let value: ICredentials = await this.cacheManager.get(
      `credentials/${login}`,
    );

    const sql = `SELECT * FROM credentials
        WHERE login = $1`;

    if (!value) {
      const { rows } = await this.pool.query(sql, [login]);
      const [result] = rows;
      await this.cacheManager.set(`credentials/${login}`, result, {
        ttl: 3600,
      });
      value = result;
    }
    end();
    this.logger.log(`get user time: ${delay()}ms`);
    if (!value) {
      return this.mapper.toVO({
        id: null,
        login: null,
        password: null,
      });
    }
    return this.mapper.toVO(value);
  }
}
