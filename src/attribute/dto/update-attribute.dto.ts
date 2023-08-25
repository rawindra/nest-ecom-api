import { PartialType } from '@nestjs/mapped-types';
import { CreateAttributeDto } from './create-attribute.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAttributeDto extends PartialType(CreateAttributeDto) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
