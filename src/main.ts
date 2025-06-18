import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ContextLogger } from 'nestjs-context-logger';
import { UnauthorizedExceptionFilter } from './auth/exception.filter';

async function bootstrap() {
  const bootstrapLogger = new ContextLogger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: bootstrapLogger,
  });
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('api');
  await app.listen(app.get(ConfigService).getOrThrow('SERVER_PORT'));
}

bootstrap();
