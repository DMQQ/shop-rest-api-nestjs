import { Resolver } from "@nestjs/graphql";
import { AddCart, CartEntity, IsInCart } from "./cart.entity";

import { Query, Mutation, Args, Int } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import { CartService } from "./cart.service";

@Resolver(() => CartEntity)
export class CartResolver {
  constructor(private cartService: CartService) {}

  @Query(() => [CartEntity], { nullable: true })
  getUserCart(@User() id: number) {
    return this.cartService.getUsersCartQL(id);
  }

  @Query(() => IsInCart)
  async isInCart(@Args("prod_id", { type: () => Int }) prod_id: number, @User() id: number) {
    const cart = await this.cartService.isInCart(id, prod_id);

    return {
      isIn: typeof cart !== "undefined",
    };
  }

  @Mutation(() => AddCart)
  async removeCart(@Args("cart_id", { type: () => Int }) cart_id: number) {
    try {
      const { ammount } = await this.cartService.findOneProductInCart(cart_id);

      if (ammount > 1) {
        await this.cartService.decreaseAmmount(cart_id, ammount);
        return {
          affected: 1,
          cart_id,
        };
      }
      const { affected } = await this.cartService.removeFromCart(cart_id);

      if (affected > 0)
        return {
          cart_id,
          affected: 1,
          prod_id: null,
        };
    } catch (error) {}
  }

  @Mutation(() => AddCart)
  async addUserCart(@Args("prod_id", { type: () => Int }) prod_id: number, @User() id: number) {
    const samelist = await this.cartService.findSameProductInCart(id, prod_id);

    if (typeof samelist === "undefined") {
      const { raw } = await this.cartService.addToCart(id, prod_id);

      return {
        prod_id,
        cart_id: raw.insertId,
        affected: raw.affectedRows,
      };
    }
    const result = await this.cartService.incrementAmmount(id, prod_id);

    if (result.affected > 0)
      return {
        cart_id: null,
        affected: 1,
        prod_id,
      };
  }
}
