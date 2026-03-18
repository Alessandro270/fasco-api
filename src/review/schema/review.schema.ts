import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GenericSchema } from 'src/generic/generic.schema';
import { Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Product } from 'src/product/schema/product.schema';

@Schema()
export class Review extends GenericSchema {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: Product.name, required: true })
  product: Product;

  @Prop({ min: 0, max: 5, default: 0 })
  value: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
