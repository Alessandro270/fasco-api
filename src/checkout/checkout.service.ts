import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GenericService } from 'src/generic/generic.service';
import { Checkout } from './schema/checkout.schema';
import { CheckoutRepository } from './checkout.repository';
import { CheckoutDto } from './dto/checkout.dto';
import { PurchaseService } from 'src/purchase/purchase.service';

@Injectable()
export class CheckoutService extends GenericService<Checkout> {
  constructor(
    protected readonly repository: CheckoutRepository,
    private readonly purchaseService: PurchaseService,
  ) {
    super(repository);
  }

  async createCheckout(dto: CheckoutDto) {
    const purchase = await this.purchaseService.create({ ...dto.purchase });
    if (!purchase)
      throw new InternalServerErrorException(
        'Não foi possível cadastrar a compra',
      );

    const checkout = await this.repository.create({ ...dto, purchase });
    return { message: 'Checkout efetuado com sucesso' };
  }
}
