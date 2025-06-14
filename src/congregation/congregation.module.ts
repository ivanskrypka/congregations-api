import { Module } from '@nestjs/common';
import { CongregationController } from './congregation.controller';
import { CongregationService } from './congregation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Congregation } from './entity/congregation.entity';
import { Country } from './entity/country.entity';
import { StaticController } from './static.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Congregation, Country])],
  controllers: [CongregationController, StaticController],
  providers: [CongregationService],
  exports: [CongregationService],
})
export class CongregationModule {}
