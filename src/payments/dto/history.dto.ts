import { IsNotEmpty, IsArray } from "class-validator";

export class HistoryDto {
  @IsArray()
  @IsNotEmpty()
  prod_id: number[];
}
