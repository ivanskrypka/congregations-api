import { ExecutionContext, Module } from '@nestjs/common';
import { CongregationModule } from './congregation/congregation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Congregation } from './congregation/entity/congregation.entity';
import { ContextLoggerModule } from 'nestjs-context-logger';
import { v4 as uuidv4 } from 'uuid';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { Country } from './congregation/entity/country.entity';
import { PublishersModule } from './publishers/publishers.module';
import { Publisher } from './publishers/entity/publisher.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Module({
  imports: [
    ContextLoggerModule.forRootAsync({
      useFactory: () => ({
        contextAdapter: (context: ExecutionContext) => ({
          sensitive: true,
        }),
        enrichContext: (context: ExecutionContext) => ({
          rid: context.switchToHttp().getRequest().headers['rid'] || uuidv4(),
        }),
      }),
    }),
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: 5432,
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        schema: configService.getOrThrow('DB_SCHEMA'),
        entities: [Country, Congregation, Publisher],
        synchronize: false,
      }),
    }),
    CongregationModule,
    HealthModule,
    PublishersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
