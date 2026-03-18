import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { CheckoutRepository } from './checkout.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Checkout, CheckoutSchema } from './schema/checkout.schema';
import { PurchaseModule } from 'src/purchase/purchase.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
    PurchaseModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService, CheckoutRepository],
})
export class CheckoutModule {}
