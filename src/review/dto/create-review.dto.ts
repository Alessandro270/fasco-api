import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'valor da avaliação, de 0 a 5', example: 4 })
  @Max(5)
  @Min(0)
  @IsPositive()
  value: number;
}
