import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Attribute } from 'src/attribute/entities/attribute.entity';

export type AttributeValueDocument = AttributeValue & Document;

@Schema({ timestamps: true })
export class AttributeValue {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Attribute' })
  attribute: Attribute | Types.ObjectId;
}

export const AttributeValueSchema =
  SchemaFactory.createForClass(AttributeValue);
