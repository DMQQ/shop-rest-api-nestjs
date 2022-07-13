import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class ParamsDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  manufacturer: string;

  @IsOptional()
  skip: number;

  @IsString()
  @IsOptional()
  q: string;
}
