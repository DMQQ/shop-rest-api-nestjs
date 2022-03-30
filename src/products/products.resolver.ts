import {
  Resolver,
  Query,
  Args,
  Int,
  ObjectType,
  Field,
  ResolveField,
  Parent,
} from "@nestjs/graphql";
import { ProductsEntity } from "./Entities/products.entity";
import { ProductsService } from "./products.service";

@ObjectType()
class Images {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}

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

  @Query(() => [ProductsEntity])
  suggestions(@Args("name") name: string) {
    return this.productsService.getProductSuggestions(name, {});
  }

  @ResolveField("img_id", () => [Images])
  async images(
    @Parent() product: ProductsEntity,
    @Args("take", { type: () => Int, nullable: true }) take: number = 10,
    @Args("skip", { type: () => Int, nullable: true }) skip: number = 0,
  ) {
    return product.img_id.splice(skip, take);
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
