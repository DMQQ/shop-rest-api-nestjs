import { Controller, Get, Param } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAll();
  }

  @Get(":category")
  getProductsByCategory(@Param("category") category: string) {
    return this.productsService.getByCategory(category);
  }
}
