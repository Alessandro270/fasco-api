import { IsNotEmpty, IsPositive, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @Max(5)
  @Min(0)
  @IsPositive()
  value: number;
}
