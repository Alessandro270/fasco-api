import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { PurchaseRepository } from './purchase.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Purchase, PurchaseSchema } from './schema/purchase.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Purchase.name, schema: PurchaseSchema },
    ]),
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService, PurchaseRepository],
  exports: [PurchaseService],
})
export class PurchaseModule {}
