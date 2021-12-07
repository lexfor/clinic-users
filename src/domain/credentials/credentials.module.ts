import { CacheModule, Module } from '@nestjs/common';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CredentialsMapper } from './mapper/credentials.mapper';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register()],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    CredentialsMapper,
  ],
  exports: [CredentialsMapper],
})
export class CredentialsModule {}
