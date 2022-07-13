import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { PagingInterceptor } from "../utils/functions/PagingInterceptor";
import { ProductsService } from "./products.service";

@Controller("sales")
export class SaleController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @UseInterceptors(PagingInterceptor)
  getSales() {
    return new Array(5)
      .fill({
        date: new Date(),
        image: "",
      })
      .map((props, index) => ({ ...props, id: index }));
  }

  @Get("/daily")
  async getDailySaleProduct() {
    return this.productsService.getDailySaleProduct().then((response) => {
      if (typeof response !== "undefined") {
        return response.results;
      }
    });
  }
}
