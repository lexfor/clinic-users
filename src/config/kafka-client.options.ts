import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaClientOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'UsersService',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'UsersGroups',
      allowAutoTopicCreation: true,
    },
  },
};
