import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PurchaseDto } from 'src/purchase/dto/purchase.dto';
import { ItemDto } from './item.dto';
import { Type } from 'class-transformer';

export class CheckoutDto {
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumberString()
  @IsNotEmpty()
  postalCode: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PurchaseDto)
  purchase: PurchaseDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
