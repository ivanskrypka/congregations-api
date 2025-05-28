import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  Resource,
  Roles,
  Scopes,
  Public,
  RoleMatchingMode,
} from 'nest-keycloak-connect';
import { CongregationService } from './congregation.service';
import { CongregationDto } from './dto/congregation.dto';
import { CreateCongregationDto } from './dto/create-congregation.dto';
import { ContextLogger } from 'nestjs-context-logger';

@Controller('congregations')
export class CongregationController {
  private readonly logger = new ContextLogger(CongregationController.name);

  constructor(private readonly congregationService: CongregationService) {}

  @Post()
  async createCongregation(
    @Body() createRequest: CreateCongregationDto,
  ): Promise<CongregationDto> {
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
  ): Promise<CongregationDto> {
    const congregation = await this.congregationService.getById(id);
    this.logger.log(
      `Congregation for id=${id} found ${JSON.stringify(congregation)}`,
    );
    return Promise.resolve(congregation);
  }
}
