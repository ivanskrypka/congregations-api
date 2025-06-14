import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { ContextLogger } from 'nestjs-context-logger';
import { PublishersService } from './publishers.service';
import { Publisher } from './entity/publisher.entity';

@Controller('congregations/:congregationId/publishers')
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
    return Promise.resolve(newPublisher);
  }
}
