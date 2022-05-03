import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { poolFactory } from '../../factories/database.factory';
import { SpecializationRepository } from './entity/specialization.repository';
import { SpecializationMapper } from './mapper/specialization.mapper';
import { SpecializationController } from './controllers/specialization.controller';
import { SpecializationService } from './services/specialization.service';
import { CreateSpecializationHandlerUsecase } from './usecase/handlers/create-specialization.handler.usecase';
import { DeleteSpecializationHandlerUsecase } from './usecase/handlers/delete-specialization.handler.usecase';
import { SpecializationFetcher } from './view/specialization.fetcher';

const handlers = [
  CreateSpecializationHandlerUsecase,
  DeleteSpecializationHandlerUsecase,
]

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register(), CqrsModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'SPECIALIZATION_REPOSITORY',
      useClass: SpecializationRepository,
    },
    {
      provide: 'SPECIALIZATION_FETCHER',
      useClass: SpecializationFetcher,
    },
    SpecializationMapper,
    SpecializationService,
    ...handlers,
  ],
  controllers: [SpecializationController],
  exports: [SpecializationMapper],
})
export class SpecializationModule {}
