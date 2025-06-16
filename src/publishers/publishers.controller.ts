import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { ContextLogger } from 'nestjs-context-logger';
import { PublishersService } from './publishers.service';
import { Publisher } from './entity/publisher.entity';
import { CongregationExistsGuard } from '../congregation/guard/congregation-exists.guard';
import { FindPublisherDto } from './dto/find-publishers.dto';

@Controller('congregations/:congregationId/publishers')
@UseGuards(CongregationExistsGuard)
export class PublishersController {
  private readonly logger = new ContextLogger(PublishersController.name);

  constructor(private readonly publishersService: PublishersService) {}

  @Post()
  async createPublisher(
    @Param('congregationId', new ParseUUIDPipe()) congregationId: string,
    @Body() createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    const newPublisher = await this.publishersService.createNew(
      congregationId,
      createPublisherDto,
    );
    this.logger.info(`New publisher created ${JSON.stringify(newPublisher)}`);
    return newPublisher;
  }

  @Put(':publisherId')
  async updatePublisher(
    @Param('congregationId', new ParseUUIDPipe()) congregationId: string,
    @Param('publisherId', new ParseUUIDPipe()) publisherId: string,
    @Body() createPublisherDto: CreatePublisherDto,
  ): Promise<Publisher> {
    const updatedPublisher = await this.publishersService.update(
      congregationId,
      publisherId,
      createPublisherDto,
    );
    this.logger.info(`Publisher updated ${JSON.stringify(updatedPublisher)}`);
    return updatedPublisher;
  }

  @Delete(':publisherId')
  async deletePublisher(
    @Param('publisherId', new ParseUUIDPipe()) publisherId: string,
  ): Promise<void> {
    await this.publishersService.delete(publisherId);
    this.logger.info(`Publisher  with id=${publisherId} deleted`);
    return Promise.resolve();
  }

  @Get(':publisherId')
  async getPublisherById(
    @Param('publisherId', new ParseUUIDPipe()) publisherId: string,
  ): Promise<Publisher> {
    const publisher = await this.publishersService.getById(publisherId);
    this.logger.info(
      `Publisher for id=${publisherId} found ${JSON.stringify(publisher)}`,
    );
    return publisher;
  }

  @Get()
  async getAllCongregationsPublishers(
    @Param('congregationId', new ParseUUIDPipe()) congregationId: string,
    @Query() query: FindPublisherDto,
  ): Promise<Publisher[]> {
    const publishers =
      await this.publishersService.findPublishersByCongregationId(
        congregationId,
        query,
      );
    this.logger.log(
      `Found ${publishers.length} in congregation with id=${congregationId} and query=${JSON.stringify(query)}`,
    );
    return publishers;
  }
}
