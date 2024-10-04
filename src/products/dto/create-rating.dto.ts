import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @IsPositive()
  value: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  productId: number; 
}
