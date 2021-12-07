import { CreateCredentialsDto } from '../dto/create-credentials.dto';
import { CredentialsVO } from '../value objects/credentials.vo';
import { CredentialsRepository } from '../credentials.repository';
import { Inject } from '@nestjs/common';

export class CreateCredentials {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: CredentialsRepository,
  ) {}

  async createUser(
    createUserDto: CreateCredentialsDto,
  ): Promise<CredentialsVO> {
    const userEntity: CredentialsVO = await CredentialsVO.create(createUserDto);
    return await this.repository.createCredentials(userEntity);
  }
}
