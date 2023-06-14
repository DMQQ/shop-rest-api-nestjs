import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";
import { Type, Transform } from "class-transformer";

export class ParamsDto {
  @Type(() => String)
  @IsString()
  @IsOptional()
  q?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  skip?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  take?: number;

  @Type(() => String)
  @IsString()
  @IsOptional()
  sort?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  order?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  category?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  manufactor?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  minPrice?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  maxPrice?: number;

  @Type(() => String)
  @IsString()
  @IsOptional()
  vendor?: string;

  @Type(() => String)
  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  @IsPositive()
  rating?: number;
}
