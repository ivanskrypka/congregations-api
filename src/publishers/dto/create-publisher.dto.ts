import {
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PublisherType, ServiceType, Sex } from '../entity/enums';
import { Utils } from '../../utils/utils';

export class CreatePublisherDto {
  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @Length(1, 100)
  lastName: string;

  @IsOptional()
  @Length(1, 100)
  fatherName: string;

  @IsEnum(PublisherType, {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message: `Should be one of the values: ${Utils.enumKeys(PublisherType)}`,
  })
  publisherType: PublisherType;

  @IsEnum(Sex, {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message: `Should be one of the values: ${Utils.enumKeys(Sex)}`,
  })
  sex: Sex;

  @IsOptional()
  @IsDateString()
  birthday: string;

  @IsOptional()
  @IsDateString()
  baptisedDate: string;

  @IsOptional()
  @Length(1, 255)
  address: string;

  @IsOptional()
  @IsArray()
  @IsEnum(ServiceType, {
    each: true,
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    message: `Should be one of the values: ${Utils.enumKeys(ServiceType)}`,
  })
  serviceTypes: ServiceType[];
}
