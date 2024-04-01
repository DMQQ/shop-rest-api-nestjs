import { Resolver, Query, Args, Int, ResolveField, Parent } from "@nestjs/graphql";
import { ProductsEntity } from "../entities/products.entity";
import { ProductsService } from "../services/products.service";
import { RatingsEntity } from "../../ratings/ratings.entity";
import { UploadEntity } from "../../upload/upload.entity";
import { NotFoundException } from "@nestjs/common";
import User from "../../utils/decorators/User";

@Resolver(() => ProductsEntity)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [ProductsEntity])
  products(
    @Args("skip", { type: () => Int, nullable: true }) skip: number,
    @Args("query", { nullable: true }) query: string,
  ) {
    return this.productsService.getAllQL(skip, { text: query });
  }

  @Query(() => [ProductsEntity])
  suggestions(@Args("name") name: string) {
    return this.productsService.getProductSuggestionsQL(name);
  }

  @ResolveField("images", () => [UploadEntity])
  async images(
    @Parent() product: ProductsEntity,
    @Args("take", { type: () => Int, nullable: true }) take: number = 10,
    @Args("skip", { type: () => Int, nullable: true }) skip: number = 0,
  ) {
    return product?.images?.splice(skip, take).sort((img1, img2) => img1.id - img2.id);
  }

  @ResolveField("ratings", () => [RatingsEntity])
  async ratings(
    @Parent() parent: ProductsEntity,
    @Args("take", { type: () => Int, nullable: true }) take: number = 2,
    @Args("skip", { type: () => Int, nullable: true }) skip: number = 0,
  ) {
    return parent?.ratings?.splice(skip, take) ?? [];
  }

  @Query(() => ProductsEntity)
  async product(@Args("prod_id", { type: () => Int }) prod_id: number, @User() user_id: number) {
    try {
      this.productsService.saveSearchedProduct(user_id, prod_id as any);

      const product = await this.productsService.getById(prod_id);

      return product;
    } catch (error) {
      throw new NotFoundException("Product not found");
    }
  }
}
