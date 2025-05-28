import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ContextLogger } from 'nestjs-context-logger';

async function bootstrap() {
  const bootstrapLogger = new ContextLogger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: bootstrapLogger,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  await app.listen(app.get(ConfigService).getOrThrow('SERVER_PORT'));
}

bootstrap();
