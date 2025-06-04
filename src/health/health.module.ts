import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TerminusModule, ConfigModule],
  controllers: [HealthController],
  providers: [ConfigService],
})
export class HealthModule {}
