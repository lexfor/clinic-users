import { Module } from '@nestjs/common';
import { CredentialsModule } from './domain/credentials/credentials.module';
import { GrpcController } from './grpc.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './infrastructure/healthcheck/health.controller';
import { DatabaseHealthIndicator } from './infrastructure/healthcheck/database.health';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { poolFactory } from './infrastructure/configs/database.config';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    CredentialsModule,
    UserModule,
    TerminusModule,
    ConfigModule.forRoot(),
  ],
  controllers: [GrpcController, HealthController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    DatabaseHealthIndicator,
  ],
})
export class AppModule {}
