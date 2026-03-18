import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Category } from 'src/category/schema/category.schema';
import { GenericSchema } from 'src/generic/generic.schema';
import { Review } from 'src/review/schema/review.schema';

@Schema()
export class Product extends GenericSchema {
  @Prop()
  name: string;

  @Prop({ default: 1.0 })
  quantity: number;

  @Prop()
  unitPrice: number;

  @Prop()
  size: string;

  @Prop()
  color: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: Category.name })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });
