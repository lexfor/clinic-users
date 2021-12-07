import { UserEntity } from '../entity/user.entity';
import { CredentialsRepository } from '../credentials.repository';
import { LoginCredentialsDto } from '../dto/login-credentials.dto';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

export class GetUser {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: CredentialsRepository,
  ) {}

  async getUser(loginUserDto: LoginCredentialsDto): Promise<UserEntity> {
    const userEntity: UserEntity = await this.repository.getCredentials(
      loginUserDto.login,
    );
    if (userEntity.getID !== null) {
      if (await userEntity.checkPassword(loginUserDto.password)) {
        return userEntity;
      } else {
        throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
      }
    } else {
      return userEntity;
    }
  }
}
