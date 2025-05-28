import { IsString, Length } from 'class-validator';

export class CreateCongregationDto {
  @IsString()
  @Length(1, 100)
  name: string;
}
