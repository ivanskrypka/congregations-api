import { Module } from '@nestjs/common';
import { CongregationController } from './congregation.controller';
import { CongregationService } from './congregation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Congregation } from './entity/congregation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Congregation])],
  controllers: [CongregationController],
  providers: [CongregationService],
})
export class CongregationModule {}
