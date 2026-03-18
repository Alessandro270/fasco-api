import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { GenericSchema } from 'src/generic/generic.schema';
import { Purchase } from 'src/purchase/schema/purchase.schema';

@Schema()
export class Checkout extends GenericSchema {
  @Prop()
  country: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  address: string;

  @Prop()
  postalCode: string;

  @Prop({ type: Types.ObjectId, ref: 'Purchase' })
  purchase: Purchase;

  @Prop([{ product: String, quantity: Number }])
  items: { product: string; quantity: number; price: number }[];
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
