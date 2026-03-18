import { Transform } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => Number(value))
  limit: number = 10;
}
