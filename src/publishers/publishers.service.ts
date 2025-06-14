import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entity/publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { CongregationService } from '../congregation/congregation.service';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    private readonly congregationService: CongregationService,
  ) {}

  async createNew(
    congregationId: string,
    dto: CreatePublisherDto,
  ): Promise<Publisher> {
    const congregation = await this.congregationService.getById(congregationId);
    const publisher = new Publisher();
    Object.assign(publisher, {
      firstName: dto.firstName,
      lastName: dto.lastName,
      fatherName: dto.fatherName,
      publisherType: dto.publisherType,
      sex: dto.sex,
      address: dto.address,
      birthday: dto.birthday ? new Date(dto.birthday) : null,
      baptisedDate: dto.baptisedDate ? new Date(dto.baptisedDate) : null,
      serviceTypes: dto.serviceTypes,
      congregationId: congregation.id,
    });
    console.log(JSON.stringify(publisher));
    return await this.publisherRepository.save(publisher);
  }
}
