import { IsIn, IsString, IsUUID, Length } from 'class-validator';

const TIMEZONES = Intl.supportedValuesOf('timeZone');

export class CreateCongregationDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsIn(TIMEZONES, { message: 'Timezone is not valid' })
  timezone: string;

  @IsString()
  @Length(1, 50)
  city: string;

  @IsUUID()
  countryId: string;
}
