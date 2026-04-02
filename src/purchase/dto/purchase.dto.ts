import { ApiProperty } from '@nestjs/swagger';
import {
  IsCreditCard,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class PurchaseDto {
  @ApiProperty({
    example: '4111111111111111',
    description: 'Número do cartão de crédito',
  })
  @IsString()
  @IsCreditCard()
  @IsNotEmpty()
  cardNumber: string;

  @ApiProperty({
    example: '123',
    description: 'Código de segurança',
  })
  @IsString()
  @IsNotEmpty()
  securityCode: string;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Data de expiração do cartão',
  })
  @IsDateString()
  @IsNotEmpty()
  expiresAt: Date;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome do titular do cartão',
  })
  @IsString()
  @IsNotEmpty()
  cardHolderName: string;
}
