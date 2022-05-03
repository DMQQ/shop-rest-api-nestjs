import { IsNotEmpty, IsArray, IsNumber } from "class-validator";

export class HistoryDto {
  @IsArray()
  @IsNotEmpty()
  prod_id: number[];

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
