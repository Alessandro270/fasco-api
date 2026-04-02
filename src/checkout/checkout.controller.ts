import { Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  @ApiOperation({ summary: 'Realizar checkout' })
  @Post()
  createCheckout(@Body() dto: CheckoutDto) {
    return this.service.createCheckout(dto);
  }
}
