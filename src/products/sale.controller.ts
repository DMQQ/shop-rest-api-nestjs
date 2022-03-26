import { Controller, Get } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("sales")
export class SaleController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getSales() {
    return {
      hasMore: false,
      results: new Array(10)
        .fill({
          id: 0,
          date: new Date(),
          image: "",
        })
        .map((props, index) => ({ ...props, id: index })),
    };
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
