import { Resolver, Query, ObjectType, Field, Int, PartialType } from "@nestjs/graphql";
import { SaleService } from "../services/sale.service";
import { ProductsEntity } from "../entities/products.entity";

@ObjectType({ isAbstract: true })
class Sale extends PartialType(ProductsEntity) {
  @Field(() => Int)
  reviewsCount: number;
}

@Resolver()
export class SaleResolver {
  constructor(private saleService: SaleService) {}

  @Query(() => Sale)
  async sale() {
    return this.saleService.getDailySale();
  }
}
