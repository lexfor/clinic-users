import { Inject, Injectable } from '@nestjs/common';
import { IUserFetcher } from '../interfaces/fetcher.interface';
import { FullUserViewDto } from '../dto/view/full-user.view.dto';
import { UserViewDto } from '../dto/view/user.view.dto';
import { UserEntity } from '../entity/user.entity';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserFetcher implements IUserFetcher {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: UserMapper,
  ) {}

  async getFullUsers() : Promise<FullUserViewDto[]> {
    const sql = `SELECT 
                    users.id,
                    first_name as firstName,
                    last_name as lastName,
                    gender,
                    address,
                    birthday,
                    photo
                    FROM users
                    INNER JOIN credentials as credential ON credential.id = credential_id
                    WHERE credential.role = 'patient';`;
    const { rows } = await this.pool.query(sql);
    return rows;
  }

  async getMe(id: string) : Promise<UserViewDto> {
    const sql = `SELECT 
                    first_name as firstName,
                    last_name as lastName,
                    users.id as id,
                    photo
                    FROM users WHERE credential_id = $1;`;
    const { rows } = await this.pool.query(sql, [id]);
    const [user] = rows;
    return user;
  }

  async findByName(name: string) : Promise<UserEntity[]> {
    let sql;
    if (name) {
      sql = `SELECT users.* FROM users 
                    INNER JOIN credentials ON credentials.id = users.credential_id
                    WHERE
                    (credentials.role = 'patient') AND (
                    users.first_name LIKE '${name}%' OR
                    users.last_name LIKE '${name}%');`;
    } else {
      sql = `SELECT users.* FROM users 
                    INNER JOIN credentials ON credentials.id = users.credential_id
                    WHERE credentials.role = 'patient'`
    }
    const { rows } = await this.pool.query(sql);
    return rows.map((row) => {
      return this.mapper.toEntity(row);
    });
  }
}