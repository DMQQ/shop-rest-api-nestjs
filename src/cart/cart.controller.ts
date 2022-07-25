import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { BAD, OK } from "../utils/constants/codes";
import User from "../utils/decorators/User";
import { PagingInterceptor } from "../utils/functions/PagingInterceptor";

function response(affected: boolean) {
  return { statusCode: !!affected ? OK : BAD, message: !!affected ? "Deleted" : "Failed" };
}

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @UseInterceptors(PagingInterceptor)
  async getCart(@User() user_id: number, @Query("skip") skip: number = 0) {
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
  async addToCart(@Body("prod_id", ParseIntPipe) prod_id: number, @User() user_id: number) {
    try {
      const list = await this.cartService.findSameProductInCart(user_id, prod_id);

      if (typeof list === "undefined") {
        const { raw } = await this.cartService.addToCart(user_id, prod_id);

        const product = await this.cartService.getOne(prod_id, user_id);

        return !!raw.affectedRows
          ? { statusCode: 201, message: "Added", product }
          : new BadRequestException();
      }
      const result = await this.cartService.incrementAmmount(user_id, prod_id);

      const product = await this.cartService.getOne(prod_id, user_id);

      return !!result.affected && { statusCode: 201, message: "Added", product };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete()
  async removeFromCart(
    @Query("id", ParseIntPipe) cart_id: number,
    @User() user_id: number,
    @Query("removeAll", new DefaultValuePipe(false), ParseBoolPipe) removeAll?: boolean,
  ) {
    try {
      if (removeAll) {
        await this.cartService.removeAll(user_id);
        return {
          statusCode: 200,
          message: "Removed all",
        };
      }

      const result = await this.cartService.findOneProductInCart(cart_id);

      if ((result?.ammount || 0) > 1) {
        const { affected } = await this.cartService.decreaseAmmount(cart_id);

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
