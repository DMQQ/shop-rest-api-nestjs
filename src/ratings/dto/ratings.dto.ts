import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RatingsDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  prod_id: number;
}
