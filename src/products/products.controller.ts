import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { ProductsDto } from "./dto/products.dto";
import { ProductsService } from "./products.service";
import { Response } from "express";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAll();
  }

  @Get("/price=:low&:high")
  async getProductsByPriceRange(
    @Param("low") low: number,
    @Param("high") high: number,
  ) {
    return this.productsService.getByPriceRange(low, high);
  }

  @Get("searched=:text")
  getBySearchTitleOrDescription(@Param("text") text: string) {
    return this.productsService.getByTitleOrDesc(text);
  }

  @Get("/category=:category")
  getProductsByCategory(@Param("category") category: string) {
    return this.productsService.getByCategory(category);
  }

  @Get("/id=:id")
  getById(@Param("id") id: number) {
    return this.productsService.getById(id);
  }

  @Post("create/product")
  createProduct(@Body() props: ProductsDto, @Res() response: Response) {
    this.productsService
      .createProduct(props)
      .then(({ raw }) => {
        if (raw.affected > 0) {
          return response
            .status(201)
            .send({ message: "Product created", code: 201 });
        }
        response.status(400).send({ message: "Failed to create product" });
      })
      .catch((err) => console.log(err));
  }
}
