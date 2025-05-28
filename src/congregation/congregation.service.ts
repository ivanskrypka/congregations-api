import { Injectable, NotFoundException } from '@nestjs/common';
import { CongregationDto } from './dto/congregation.dto';
import { CreateCongregationDto } from './dto/create-congregation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Congregation } from './entity/congregation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CongregationService {
  constructor(
    @InjectRepository(Congregation)
    private readonly congregationRepository: Repository<Congregation>,
  ) {}

  async create({ name }: CreateCongregationDto): Promise<CongregationDto> {
    const entity = Object.assign(new Congregation(), { name: name });
    console.log('Entity created ', entity);
    return await this.congregationRepository.save(entity);
  }

  async getById(id: string): Promise<CongregationDto> {
    const entity = await this.congregationRepository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`Could not find congregation with id ${id}`);
    }
    return Promise.resolve(new CongregationDto(id, entity.name));
  }
}
