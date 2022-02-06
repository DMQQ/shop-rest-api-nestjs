import { Controller, Get } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("sales")
export class SaleController {
  constructor(private productsService: ProductsService) {}

  @Get("/daily")
  async getDailySaleProduct() {
    return this.productsService.getDailySaleProduct().then((response) => {
      if (typeof response !== "undefined") {
        return {
          ...{
            ...response.results,
          },
        };
      }
    });
  }
}
