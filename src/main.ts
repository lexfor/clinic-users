import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaClientOptions } from './config/kafka-client.options';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>(kafkaClientOptions);
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
