import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './product.entity';
import { Types } from 'mongoose';
import { AttributeValue } from 'src/attribute-value/entities/attribute-value.entity';
import { Attribute } from 'src/attribute/entities/attribute.entity';

export type ProductAttributeValuePriceDocument = ProductAttributeValuePrice &
  Document;

@Schema()
export class ProductAttributeValuePrice {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Product | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AttributeValue' })
  attribute: Attribute | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'AttributeValue' })
  attributeValue: AttributeValue | Types.ObjectId;

  @Prop()
  price: string;

  @Prop()
  maxPrice?: number;

  @Prop()
  minPrice?: number;
}

export const ProductAttributeValuePriceSchema = SchemaFactory.createForClass(
  ProductAttributeValuePrice,
);
