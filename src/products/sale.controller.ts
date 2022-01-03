import { Controller, Get } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("sales")
export class SaleController {
  constructor(private productsService: ProductsService) {}

  @Get("/daily")
  async getDailySaleProduct() {
    return this.productsService.getDailySaleProduct().then((response) => {
      return {
        ...response,
        results: response.results.map((prod) => ({
          ...prod,
          price: (prod.price * 0.8).toFixed(2), // 20% off
        })),
      };
    });
  }
}
