import { GenericRepository } from 'src/generic/generic.repository';
import { Purchase } from './schema/purchase.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class PurchaseRepository extends GenericRepository<Purchase> {
  constructor(
    @InjectModel(Purchase.name)
    protected readonly model: Model<Purchase>,
  ) {
    super(model);
  }
}
