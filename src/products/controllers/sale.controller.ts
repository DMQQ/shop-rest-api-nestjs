import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { PagingInterceptor } from "../../utils/functions/PagingInterceptor";
import { SaleService } from "../services/sale.service";

@Controller("sales")
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Get()
  @UseInterceptors(PagingInterceptor)
  getSales() {
    return [
      new Array(5)
        .fill({
          date: new Date(),
          image: "",
        })
        .map((props, index) => ({ ...props, id: index })),
      5,
    ];
  }

  @Get("/daily")
  async getDailySaleProduct() {
    return this.saleService.getDailySale();
  }
}
