import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import { CredentialsRepository } from '../credentials.repository';
import { Inject } from '@nestjs/common';

export class CreateUsers {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: CredentialsRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = await UserEntity.create(createUserDto);
    return await this.repository.createCredentials(userEntity);
  }
}
