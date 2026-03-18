import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Checkout } from 'src/checkout/schema/checkout.schema';
import { GenericSchema } from 'src/generic/generic.schema';

@Schema()
export class Purchase extends GenericSchema {
  @Prop()
  cardNumber: string;

  @Prop()
  securityCode: string;

  @Prop()
  expiresAt: Date;

  @Prop()
  cardHolderName: string;

  @Prop({ type: Types.ObjectId, ref: 'Checkout', nullable: true })
  checkout: Checkout;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
