import { IsNotEmpty, IsNumber } from "class-validator";

export class HistoryDto {
  @IsNumber()
  @IsNotEmpty()
  prod_id: number;
}
