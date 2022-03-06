import { Resolver } from "@nestjs/graphql";
import { CartEntity } from "./cart.entity";

import { Query, Mutation, Args, Int } from "@nestjs/graphql";
import User from "../decorators/User";
import { CartService } from "./cart.service";

@Resolver(() => CartEntity)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => [CartEntity], { nullable: true })
  getUserCart(@User() id: number) {
    return this.cartService.getUsersCartQL(id);
  }

  @Mutation(() => CartEntity)
  async addUserCart(@Args("prod_id", { type: () => Int }) prod_id: number, @User() id: number) {
    const { generatedMaps } = await this.cartService.addToCart(id, prod_id);
    const cart = await this.cartService.findOneProductInCart(generatedMaps[0].cart_id);

    return cart;
  }
}
