import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { CongregationService } from './congregation.service';
import { CreateCongregationDto } from './dto/create-congregation.dto';
import { ContextLogger } from 'nestjs-context-logger';
import { Congregation } from './entity/congregation.entity';

@Controller('congregations')
export class CongregationController {
  private readonly logger = new ContextLogger(CongregationController.name);

  constructor(private readonly congregationService: CongregationService) {}

  @Post()
  async createCongregation(
    @Body() createRequest: CreateCongregationDto,
  ): Promise<Congregation> {
    const newCongregation =
      await this.congregationService.create(createRequest);
    this.logger.log(
      `New congregation created ${JSON.stringify(newCongregation)}`,
    );
    return Promise.resolve(newCongregation);
  }

  @Get(':id')
  async getCongregationById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Congregation> {
    const congregation = await this.congregationService.getById(id);
    this.logger.log(
      `Congregation for id=${id} found ${JSON.stringify(congregation)}`,
    );
    return Promise.resolve(congregation);
  }
}
