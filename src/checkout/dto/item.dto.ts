import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class ItemDto {
  @ApiProperty({
    example: '5fc5b4d8e8f1a10017b1c1a1',
    description: 'ID do produto',
  })
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty({
    example: 2,
    description: 'Quantidade do produto',
  })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({
    example: 100,
    description: 'Preço do produto',
  })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
