import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCongregationDto } from './dto/create-congregation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Congregation } from './entity/congregation.entity';
import { Repository } from 'typeorm';
import { Country } from './entity/country.entity';

@Injectable()
export class CongregationService {
  constructor(
    @InjectRepository(Congregation)
    private readonly congregationRepository: Repository<Congregation>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create({
    name,
    timezone,
    countryId,
    city,
  }: CreateCongregationDto): Promise<Congregation> {
    const country = await this.countryRepository.findOneBy({ id: countryId });
    if (!country) {
      throw new BadRequestException(
        `Could not find country with id ${countryId}`,
      );
    }
    const entity = Object.assign(new Congregation(), {
      name: name,
      timezone: timezone,
      country: countryId,
      city: city,
    });
    return await this.congregationRepository.save(entity);
  }

  async getById(id: string): Promise<Congregation> {
    const entity = await this.congregationRepository.findOne({
      where: { id },
      relations: ['country'],
    });
    if (!entity) {
      throw new NotFoundException(`Could not find congregation with id ${id}`);
    }
    return Promise.resolve(entity);
  }

  async delete(id: string): Promise<void> {
    const entity = await this.getById(id);
    await this.congregationRepository.remove(entity);
  }

  async exists(id: string): Promise<boolean> {
    return (await this.congregationRepository.count({ where: { id } })) > 0;
  }
}
