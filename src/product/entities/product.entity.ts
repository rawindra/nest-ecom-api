import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { ProductAttributeValuePrice } from './productAttributeValuePrice';

enum ProductType {
  Single = 'single',
  Variable = 'variable',
  Bundle = 'bundle',
}

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  productType: ProductType;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category | Types.ObjectId;

  @Prop()
  variations: [
    {
      attribute?: { type: Types.ObjectId; ref: 'AttributeValue' };
      attributeValue?: { type: Types.ObjectId; ref: 'AttributeValue' };
      price?: string;
      maxPrice?: number;
      minPrice?: number;
    },
  ];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
