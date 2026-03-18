import {
  IsArray,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity: number;

  @IsNumber()
  @IsPositive()
  unitPrice: number;

  @IsArray()
  @IsOptional()
  size: string;

  @IsString()
  @IsHexColor()
  color: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
