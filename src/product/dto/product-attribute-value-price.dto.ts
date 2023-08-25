import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductAttributeValuePriceDto {
  @IsString()
  @IsOptional()
  product: string;

  @IsNotEmpty()
  @IsString()
  attribute: string;

  @IsNotEmpty()
  @IsString()
  attributeValue: string;

  @IsString()
  @IsOptional()
  price: string;

  @IsNumber()
  @IsOptional()
  maxPrice: number;

  @IsNumber()
  @IsOptional()
  minPrice: number;
}
