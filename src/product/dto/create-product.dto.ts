import { ApiProperty } from '@nestjs/swagger';
import {
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Smartphone XYZ',
    description: 'Nome do produto',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 12,
    description: 'Quantidade do produto',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity: number;

  @ApiProperty({
    example: 999.99,
    description: 'Preço unitario do produto',
  })
  @IsNumber()
  @IsPositive()
  unitPrice: number;

  @ApiProperty({
    example: 'L',
    description: 'Tamanho do produto',
  })
  @IsString()
  @IsOptional()
  size: string;

  @ApiProperty({
    example: '#FF5733',
    description: 'Cor do produto em formato hexadecimal',
  })
  @IsString()
  @IsHexColor()
  color: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'URL da imagem do produto',
  })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({
    example: 'Apple',
    description: 'Marca do produto',
  })
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({
    example: 'Smartphone de última geração',
    description: 'Descrição do produto',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    example: 'Eletrônicos',
    description: 'Categoria do produto',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
