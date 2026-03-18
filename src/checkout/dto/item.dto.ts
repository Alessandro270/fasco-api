import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class ItemDto {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  product: string;

  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
