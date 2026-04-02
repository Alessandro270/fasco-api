import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Eletrônicos',
    description: 'Nome da categoria',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      'Categoria para produtos eletrônicos como smartphones, laptops, etc.',
    description: 'Descrição da categoria',
  })
  @IsString()
  @IsOptional()
  description: string;
}
