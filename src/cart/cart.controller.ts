import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseFilters,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { Response } from "express";
import { BAD, CREATED, OK } from "../constants/codes";
import User from "../decorators/User";
import { HttpExceptionFilter } from "../filters/HttpExceptionFilter";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@User() user_id: number) {
    return this.cartService.getUsersCart(user_id);
  }

  @Get("/check")
  async checkIsIn(@Query("prod_id") prod_id: number, @User() id: number) {
    const cart = await this.cartService.getOneByUserAndProduct(id, prod_id);
    return {
      isIn: typeof cart !== "undefined",
    };
  }

  @Post()
  @UseFilters(HttpExceptionFilter)
  async addToCart(
    @Body("prod_id", ParseIntPipe) prod_id: number,
    @User() user_id: number,
    @Res() res: Response,
  ) {
    return this.cartService.findSameProductInCart(user_id, prod_id).then(async (sameList) => {
      if (typeof sameList === "undefined") {
        try {
          const { raw } = await this.cartService.addToCart(user_id, prod_id);

          if (raw?.affectedRows > 0) {
            return res.status(201).send({
              status: "Added",
              code: 201,
            });
          }
          throw new BadRequestException();
        } catch (error) {
          throw new BadRequestException("Something went wrong");
        }
      }
      this.cartService.incrementAmmount(user_id, prod_id).then((result) => {
        if (result.affected > 0) {
          res.status(CREATED).send({
            code: CREATED,
            status: "Added",
          });
        }
      });
    });
  }

  @Delete()
  removeFromCart(@Query("id", ParseIntPipe) cart_id: number, @Res() response: Response) {
    this.cartService.findOneProductInCart(cart_id).then(async ({ ammount }) => {
      if (ammount > 1) {
        return this.cartService.decreaseAmmount(cart_id, ammount).then(({ affected }) => {
          if (affected > 0) {
            return response.status(OK).send({ statusCode: OK, message: "Deleted" });
          }
          response.status(BAD).send({ statusCode: BAD, message: "Failed" });
        });
      }
      this.cartService.removeFromCart(cart_id).then(({ affected }) => {
        if (affected > 0) {
          return response.send({ statusCode: OK, message: "Deleted" });
        }
        response.status(400).send({ statusCode: BAD, message: "Failed" });
      });
    });
  }
}
