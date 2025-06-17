import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entity/publisher.entity';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { FindPublisherDto } from './dto/find-publishers.dto';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  async createNew(
    congregationId: string,
    dto: CreatePublisherDto,
  ): Promise<Publisher> {
    return await this.savePublisher(new Publisher(), dto, congregationId);
  }

  async update(
    congregationId: string,
    publisherId: string,
    dto: CreatePublisherDto,
  ): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOneBy({
      id: publisherId,
    });
    if (!publisher) {
      throw new NotFoundException(
        `Could not find publisher with id ${publisherId}`,
      );
    }
    return await this.savePublisher(publisher, dto, congregationId);
  }

  async getById(id: string): Promise<Publisher> {
    const entity = await this.publisherRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Could not find publisher with id ${id}`);
    }
    return Promise.resolve(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.getById(id);
    await this.publisherRepository.remove(entity);
  }

  async findPublishersByCongregationId(
    congregationId: string,
    { searchTerm, serviceTypes }: FindPublisherDto,
  ): Promise<Publisher[]> {
    const cb = this.publisherRepository
      .createQueryBuilder('publisher')
      .where('publisher.congregationId = :congregationId', { congregationId });
    if (searchTerm) {
      cb.andWhere(
        '(publisher.firstName ILIKE :searchTerm OR publisher.lastName ILIKE :searchTerm)',
        { searchTerm: `%${searchTerm}%` },
      );
    }
    if (serviceTypes) {
      cb.andWhere(
        'publisher.serviceTypes && ARRAY[:...serviceTypes]::congregations.service_type[]',
        { serviceTypes },
      );
    }
    return await cb
      .orderBy('publisher.lastName', 'ASC')
      .addOrderBy('publisher.firstName', 'ASC')
      .getMany();
  }

  private async savePublisher(
    publisher: Publisher,
    dto: CreatePublisherDto,
    congregationId: string,
  ) {
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
      congregationId: congregationId,
    });
    return await this.publisherRepository.save(publisher);
  }
}
