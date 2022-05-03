import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../interfaces/repository.interface';
import { UserMapper } from '../mapper/user.mapper';
import { IUser } from '../interfaces/user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: UserMapper,
  ) {}

  async createUser(user: IUser) : Promise<UserEntity> {
    const sql = `INSERT INTO users (
                 id, 
                 first_name, 
                 last_name, 
                 gender, 
                 address,
                 birthday, 
                 photo, 
                 credential_id
                 ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    await this.pool.query(sql, [
      user.id,
      user.first_name,
      user.last_name,
      user.gender,
      user.address,
      user.birthday,
      user.photo,
      user.credential_id,
    ]);

    return this.mapper.toEntity(user);
  }

  async updateUser(user: IUser) : Promise<UserEntity> {
    const sql = `UPDATE users SET 
                 first_name = $1,
                 last_name = $2,
                 gender = $3,
                 address = $4,
                 birthday = $5
                 WHERE id = $6;`;
    await this.pool.query(sql, [
      user.first_name,
      user.last_name,
      user.gender,
      user.address,
      user.birthday,
      user.id,
    ]);

    return this.mapper.toEntity(user);
  }

  async getUserByCredentialID(id: string) : Promise<UserEntity> {
    const sql = `SELECT * FROM users
                 WHERE users.credential_id = $1;`;
    const {rows} = await this.pool.query(sql, [id]);
    const [user] = rows;
    return this.mapper.toEntity(user);
  }

  async getUserByID(id: string) : Promise<UserEntity> {
    const sql = `SELECT * FROM users
                 WHERE id = $1;`;
    const {rows} = await this.pool.query(sql, [id]);
    const [user] = rows;
    return this.mapper.toEntity(user);
  }

  async deleteUser(id: string) : Promise<void> {
    const sql = `DELETE FROM users
                 WHERE id = $1;`;
    await this.pool.query(sql, [id]);
  }
}