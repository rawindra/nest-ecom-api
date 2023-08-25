import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';

export type AttributeDocument = Attribute & Document;

@Schema({ timestamps: true })
export class Attribute {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category | Types.ObjectId;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
