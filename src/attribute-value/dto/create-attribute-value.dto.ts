import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAttributeValueDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  attribute: string;
}
