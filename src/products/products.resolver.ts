import { Resolver, Query, Args, Int, ResolveField, Parent } from "@nestjs/graphql";
import { ProductsEntity } from "./Entities/products.entity";
import { ProductsService } from "./products.service";
import { RatingsEntity } from "../ratings/ratings.entity";
import { UploadEntity } from "../upload/upload.entity";
import { RatingsService } from "../ratings/ratings.service";
import { NotFoundException } from "@nestjs/common";

@Resolver(() => ProductsEntity)
export class ProductsResolver {
  constructor(private productsService: ProductsService, private ratingService: RatingsService) {}

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

  @ResolveField("img_id", () => [UploadEntity])
  async images(
    @Parent() product: ProductsEntity,
    @Args("take", { type: () => Int, nullable: true }) take: number = 10,
    @Args("skip", { type: () => Int, nullable: true }) skip: number = 0,
  ) {
    return product.img_id.splice(skip, take).sort((img1, img2) => img1.id - img2.id);
  }

  @ResolveField("rating_id", () => [RatingsEntity])
  async ratings(
    @Parent() parent: ProductsEntity,
    @Args("take", { type: () => Int, nullable: true }) take: number = 2,
    @Args("skip", { type: () => Int, nullable: true }) skip: number = 0,
  ) {
    return parent.rating_id.splice(skip, take);
  }

  @Query(() => ProductsEntity)
  async sale() {
    return this.productsService.getDailySaleProduct().then((r) => r.results);
  }

  @Query(() => ProductsEntity)
  async product(@Args("prod_id", { type: () => Int }) prod_id: number) {
    try {
      const [rating] = await this.ratingService.getAvg(prod_id);

      const product = await this.productsService.getById(prod_id);

      return {
        ...product,
        rating: Math.ceil(Number(rating["AVG(rating)"] ?? 0)),
      };
    } catch (error) {
      throw new NotFoundException("Product not found");
    }
  }
}
