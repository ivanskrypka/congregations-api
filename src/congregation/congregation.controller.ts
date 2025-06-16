import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
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
    this.logger.info(
      `New congregation created ${JSON.stringify(newCongregation)}`,
    );
    return newCongregation;
  }

  @Delete()
  async deleteCongregation(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    await this.congregationService.delete(id);
    this.logger.info(`Congregation  with id=${id} deleted`);
    return Promise.resolve();
  }

  @Get(':id')
  async getCongregationById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Congregation> {
    const congregation = await this.congregationService.getById(id);
    this.logger.info(
      `Congregation for id=${id} found ${JSON.stringify(congregation)}`,
    );
    return congregation;
  }
}
