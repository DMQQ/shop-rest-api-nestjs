import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { ProductsEntity } from "./Entities/products.entity";
import { ProductsService } from "./products.service";

@Resolver(() => ProductsEntity)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [ProductsEntity])
  getAllProducts(@Args("skip", { type: () => Int, nullable: true }) skip: number) {
    return this.productsService.getAllQL(skip);
  }

  @Query(() => ProductsEntity)
  getSingleProduct(@Args("prod_id", { type: () => Int }) prod_id: number) {
    return this.productsService.getById(prod_id);
  }
}
