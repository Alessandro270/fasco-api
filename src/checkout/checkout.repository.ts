import { GenericRepository } from 'src/generic/generic.repository';
import { Checkout } from './schema/checkout.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class CheckoutRepository extends GenericRepository<Checkout> {
  constructor(
    @InjectModel(Checkout.name)
    protected readonly model: Model<Checkout>,
  ) {
    super(model);
  }
}
