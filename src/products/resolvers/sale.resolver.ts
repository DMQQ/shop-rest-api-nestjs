import { Resolver, Query } from "@nestjs/graphql";
import { SaleService } from "../services/sale.service";
import { ProductsEntity } from "../entities/products.entity";

@Resolver()
export class SaleResolver {
  constructor(private saleService: SaleService) {}

  @Query(() => ProductsEntity)
  async sale() {
    return this.saleService.getDailySale();
  }
}
