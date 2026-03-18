import {
  IsCreditCard,
  IsDateString,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class PurchaseDto {
  @IsString()
  @IsCreditCard()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  securityCode: string;

  @IsDateString()
  @IsNotEmpty()
  expiresAt: Date;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;
}
