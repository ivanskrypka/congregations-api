import { Country } from '../../location/entity/country.entity';

export class CongregationDto {
  id: string;
  name: string;
  timezone: string;
  country: Country;

  constructor(id: string, name: string, timezone: string, country: Country) {
    this.id = id;
    this.name = name;
    this.timezone = timezone;
    this.country = country;
  }
}
