import { Controller, Get } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("sales")
export class SaleController {
  constructor(private productsService: ProductsService) {}

  @Get("/daily")
  getDailySaleProduct() {
    return this.productsService.getDailySaleProduct();
  }
}
