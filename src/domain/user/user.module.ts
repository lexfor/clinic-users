import { CacheModule, Module } from '@nestjs/common';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserMapper } from './mapper/user.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register(), CqrsModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    UserMapper,
    ...CommandHandlers,
  ],
  exports: [UserMapper],
})
export class UserModule {}
