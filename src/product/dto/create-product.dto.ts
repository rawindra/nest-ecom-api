import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // @IsNumber()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  variations: [];
}
