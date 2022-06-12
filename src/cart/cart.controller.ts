import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
} from "@nestjs/common";
import { CartService } from "./cart.service";

import { BAD, OK } from "../utils/constants/codes";
import User from "../utils/decorators/User";
import { HttpExceptionFilter } from "../utils/filters/HttpExceptionFilter";

function response(affected: boolean) {
  return { statusCode: !!affected ? OK : BAD, message: !!affected ? "Deleted" : "Failed" };
}

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@User() user_id: number, @Query("skip") skip: number) {
    return this.cartService.getCart(user_id, skip);
  }

  @Get("/check")
  async checkIsIn(@Query("prod_id") prod_id: number, @User() id: number) {
    const cart = await this.cartService.isInCart(id, prod_id);
    return {
      isIn: typeof cart !== "undefined",
    };
  }

  @Post()
  @UseFilters(HttpExceptionFilter)
  async addToCart(@Body("prod_id", ParseIntPipe) prod_id: number, @User() user_id: number) {
    try {
      const list = await this.cartService.findSameProductInCart(user_id, prod_id);

      if (typeof list === "undefined") {
        const { raw } = await this.cartService.addToCart(user_id, prod_id);

        const product = await this.cartService.getSingleCartProduct(prod_id, user_id);

        return !!raw.affectedRows
          ? { statusCode: 201, message: "Added", product }
          : new BadRequestException();
      }
      const result = await this.cartService.incrementAmmount(user_id, prod_id);

      const product = await this.cartService.getSingleCartProduct(prod_id, user_id);

      return !!result.affected && { statusCode: 201, message: "Added", product };
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }

  @Delete()
  async removeFromCart(@Query("id", ParseIntPipe) cart_id: number) {
    try {
      const result = await this.cartService.findOneProductInCart(cart_id);

      if ((result?.ammount || 0) > 1) {
        const { affected } = await this.cartService.decreaseAmmount(
          cart_id,
          result!.ammount as number,
        );

        return response(!!affected);
      }

      const { affected } = await this.cartService.removeFromCart(cart_id);

      return response(!!affected);
    } catch (error) {
      throw new BadRequestException({
        message: error,
      });
    }
  }
}
