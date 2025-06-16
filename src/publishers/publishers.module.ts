import { Module } from '@nestjs/common';
import { PublishersService } from './publishers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publisher } from './entity/publisher.entity';
import { PublishersController } from './publishers.controller';
import { CongregationModule } from '../congregation/congregation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Publisher]), CongregationModule],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}
