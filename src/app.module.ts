import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { KafkaController } from './kafka.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserPatientSaga } from './sagas/create/user/patient';
import { SpecializationModule } from './domain/specialization/specialization.module';
import { CreateUserDoctorSaga } from './sagas/create/user/doctor';
import { CreateDoctorSaga } from './sagas/create/doctor';
import { DeleteUserDoctorSaga } from './sagas/delete/user/doctor';
import { UpdateUserDoctorSaga } from './sagas/update/user/doctor';
import { DoctorModule } from './domain/doctor/doctor.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const sagas = [
  CreateUserPatientSaga,
  CreateUserDoctorSaga,
  CreateDoctorSaga,
  DeleteUserDoctorSaga,
  UpdateUserDoctorSaga,
]

@Module({
  imports: [
    UserModule,
    DoctorModule,
    SpecializationModule,
    CqrsModule,
    ConfigModule,
    ConfigModule.forRoot(),
    CqrsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public', 'photo'),
    }),
  ],
  providers: [...sagas, JwtStrategy],
  controllers: [KafkaController],
})
export class AppModule {}
