import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PurchaseDto } from 'src/purchase/dto/purchase.dto';
import { ItemDto } from './item.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CheckoutDto {
  @ApiProperty({
    example: 'Brasil',
    description: 'País do cliente',
  })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({
    example: 'João',
    description: 'Primeiro nome do cliente',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    example: 'Silva',
    description: 'Sobrenome do cliente',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    example: 'Av. Brasil, 123',
    description: 'Endereço do cliente',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '12345-678',
    description: 'CEP do cliente',
  })
  @IsNumberString()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty({
    description: 'Dados da compra',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PurchaseDto)
  purchase: PurchaseDto;

  @ApiProperty({
    description: 'Lista de itens da compra',
    example: [
      {
        productId: '60d21b4667d0d8992e610c85',
        quantity: 2,
        price: 199.99,
      },
      {
        productId: '60d21b4967d0d8992e610c86',
        quantity: 1,
        price: 99.99,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
