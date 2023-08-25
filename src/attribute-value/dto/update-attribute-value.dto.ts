import { PartialType } from '@nestjs/mapped-types';
import { CreateAttributeValueDto } from './create-attribute-value.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAttributeValueDto extends PartialType(
  CreateAttributeValueDto,
) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  attribute: string;
}
