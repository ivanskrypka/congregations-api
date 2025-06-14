import { ExecutionContext, Module } from '@nestjs/common';
import { CongregationModule } from './congregation/congregation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Congregation } from './congregation/entity/congregation.entity';
import { ContextLoggerModule } from 'nestjs-context-logger';
import { v4 as uuidv4 } from 'uuid';
import {
  AuthGuard,
  KeycloakConnectModule,
  PolicyEnforcementMode,
  ResourceGuard,
  RoleGuard,
  TokenValidation,
} from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { CountryModule } from './location/countryModule';
import { Country } from './location/entity/country.entity';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        authServerUrl: configService.getOrThrow('KEYCLOAK_SERVER_URL'),
        realm: configService.getOrThrow('KEYCLOAK_REALM'),
        clientId: configService.getOrThrow('CLIENT_ID'),
        secret: configService.getOrThrow('CLIENT_SECRET'),
        tokenValidation: TokenValidation.ONLINE,
        policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
      }),
    }),
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
        entities: [Country, Congregation],
        synchronize: false,
      }),
    }),
    CountryModule,
    CongregationModule,
    HealthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
