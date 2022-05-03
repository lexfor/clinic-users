import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { poolFactory } from '../../factories/database.factory';
import { DoctorRepository } from './entity/doctor.repository';
import { DoctorMapper } from './mapper/doctor.mapper';
import { DoctorController } from './controllers/doctor.controller';
import { DoctorService } from './services/doctor.service';
import { CreateDoctorHandlerUsecase } from './usecase/handlers/create-doctor.handler.usecase';
import { UpdateDoctorHandlerUsecase } from './usecase/handlers/update-doctor.handler.usecase';
import { DeleteDoctorHandlerUsecase } from './usecase/handlers/delete-doctor.handler.usecase';
import { DoctorFetcher } from './view/doctor.fetcher';

const handlers = [
  CreateDoctorHandlerUsecase,
  UpdateDoctorHandlerUsecase,
  DeleteDoctorHandlerUsecase,
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
      provide: 'DOCTOR_REPOSITORY',
      useClass: DoctorRepository,
    },
    {
      provide: 'DOCTOR_FETCHER',
      useClass: DoctorFetcher,
    },
    DoctorMapper,
    DoctorService,
    ...handlers,
  ],
  controllers: [DoctorController],
  exports: [DoctorMapper],
})
export class DoctorModule {}
