import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserMapper } from './mapper/user.mapper';
import { CqrsModule } from '@nestjs/cqrs';
import { UserRepository } from './entity/user.repository';
import { poolFactory } from '../../factories/database.factory';
import { UserMeController } from './controllers/user.me.controller';
import { PatientController } from './controllers/patient.controller';
import { PatientService } from './services/patient.service';
import { UserService } from './services/user.service';
import {
  CreateDoctorUserHandlerUsecase,
  CreatePatientUserHandlerUsecase,
  DeleteDoctorUserHandlerUsecase, UpdateDoctorUserHandlerUsecase,
} from './usecases/handlers';
import { DeletePatientUserHandlerUsecase } from './usecases/handlers/delete-patient.user.handler.usecase';
import { UserFetcher } from './view/user.fetcher';
import { UpdateUserHandlerUsecase } from './usecases/handlers/update-user.handler.usecase';
import { UserController } from './controllers/user.controller';

const handlers = [
  CreateDoctorUserHandlerUsecase,
  CreatePatientUserHandlerUsecase,
  DeleteDoctorUserHandlerUsecase,
  DeletePatientUserHandlerUsecase,
  UpdateDoctorUserHandlerUsecase,
  UpdateUserHandlerUsecase,
];

@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register(), CqrsModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
    {
      provide: 'USER_FETCHER',
      useClass: UserFetcher,
    },
    UserMapper,
    PatientService,
    UserService,
    ...handlers,
  ],
  controllers: [UserMeController, PatientController, UserController],
  exports: [UserMapper],
})
export class UserModule {}
