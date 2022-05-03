import { Controller, OnModuleInit } from '@nestjs/common';
import {
  ClientKafka,
  Client,
  EventPattern,
} from '@nestjs/microservices';
import { EventBus } from '@nestjs/cqrs';
import { CreateUserPatientEvent } from './sagas/create/user/patient';
import { kafkaClientOptions } from './config/kafka-client.options';
import { CreateUserDoctorEvent } from './sagas/create/user/doctor';
import { CreateDoctorEvent } from './sagas/create/doctor';
import { UpdateUserDoctorEvent } from './sagas/update/user/doctor';
import { DeleteUserDoctorEvent } from './sagas/delete/user/doctor';

@Controller()
export class KafkaController implements OnModuleInit {
  @Client(kafkaClientOptions)
  kafkaClient: ClientKafka;
  constructor(
    private readonly eventBus: EventBus,
    ) {}

  async onModuleInit() {
    const requestPatterns = [
      'create.patient.credential',
      'create.doctor.credential',
    ];

    requestPatterns.forEach((pattern) => {
      this.kafkaClient.subscribeToResponseOf(pattern);
    });
    await this.kafkaClient.connect();
  }

  @EventPattern('create.patient.credential')
  async createCredentialListener({ value }) {
    const event =  new CreateUserPatientEvent(
      value.actionID,
      value.firstName,
      value.lastName,
      value.birthday,
      value.address,
      value.gender,
      value.credentialID,
  );
    this.eventBus.publish(event);
  }

  @EventPattern('create.doctor.credential')
  async createDoctorCredentialListener({ value }) {
    const event =  new CreateUserDoctorEvent(
      value.actionID,
      value.firstName,
      value.lastName,
      value.birthday,
      value.address,
      value.gender,
      value.cabinet,
      value.position,
      value.specializationID,
      value.credentialID,
    );
    this.eventBus.publish(event);
  }

  @EventPattern('create.doctor.user')
  async createDoctorUserListener({ value }) {
    const event =  new CreateDoctorEvent(
      value.actionID,
      value.cabinet,
      value.position,
      value.specializationID,
      value.userID,
    );
    this.eventBus.publish(event);
  }

  @EventPattern('update.doctor')
  async updateDoctorListener({ value }) {
    const event =  new UpdateUserDoctorEvent(
      value.actionID,
      value.firstName,
      value.lastName,
      value.birthday,
      value.address,
      value.gender,
      value.userID,
    );
    this.eventBus.publish(event);
  }

  @EventPattern('delete.doctor')
  async deleteDoctorListener({ value }) {
    const event =  new DeleteUserDoctorEvent(
      value.actionID,
      value.userID,
    );
    this.eventBus.publish(event);
  }
}
