import { Injectable } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Purchase } from './schema/purchase.schema';
import { PurchaseRepository } from './purchase.repository';

@Injectable()
export class PurchaseService extends GenericService<Purchase> {
  constructor(protected readonly repository: PurchaseRepository) {
    super(repository);
  }
}
