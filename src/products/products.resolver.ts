import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { ProductsEntity } from "./Entities/products.entity";
import { ProductsService } from "./products.service";

@Resolver(() => ProductsEntity)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [ProductsEntity])
  products(
    @Args("skip", { type: () => Int, nullable: true }) skip: number,
    @Args("query", { nullable: true }) query: string,
  ) {
    return this.productsService.getAllQL(skip);
  }

  @Query(() => ProductsEntity)
  async sale() {
    return this.productsService.getDailySaleProduct().then((r) => r.results);
  }

  @Query(() => ProductsEntity)
  product(@Args("prod_id", { type: () => Int }) prod_id: number) {
    return this.productsService.getById(prod_id);
  }
}
