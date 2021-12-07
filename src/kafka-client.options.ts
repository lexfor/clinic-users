import { ClientOptions, Transport } from '@nestjs/microservices';

export const kafkaClientOptions: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    producer: {},
  },
};
