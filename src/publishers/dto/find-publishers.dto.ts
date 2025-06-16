import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ServiceType } from '../entity/enums';
import { Utils } from '../../utils/utils';
import { Transform } from 'class-transformer';

export class FindPublisherDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  searchTerm?: string;

  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @ArrayMaxSize(Utils.enumKeysCount(ServiceType))
  @IsEnum(ServiceType, {
    each: true,
    message: `Should be one of the values: ${Utils.enumKeys(ServiceType)}`,
  })
  serviceTypes?: ServiceType[];
}
