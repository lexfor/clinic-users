import { CacheModule, Module } from '@nestjs/common';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CredentialsMapper } from './mapper/credentials.mapper';
import { CreateCredentials } from './actions/createCredentials';
import { GetCredentials } from './actions/getCredentials';
import { CredentialsRepository } from './credentials.repository';
import { LoggerModule } from '../../infrastructure/logger/logger.module';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register(), LoggerModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'DATABASE_REPOSITORY',
      useClass: CredentialsRepository,
    },
    CreateCredentials,
    GetCredentials,
    CredentialsMapper,
  ],
  exports: [CreateCredentials, GetCredentials, CredentialsMapper],
})
export class CredentialsModule {}
