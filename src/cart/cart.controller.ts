import { Body, Controller, Delete, Get, ParseIntPipe, Post, Query, Res } from "@nestjs/common";
import { CartService } from "./cart.service";
import { Response } from "express";
import { BAD, CREATED, OK } from "../constants/codes";
import User from "../decorators/User";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@User() user_id: number) {
    return this.cartService.getUsersCart(user_id);
  }

  @Post()
  addToCart(
    @Body("prod_id", ParseIntPipe) prod_id: number,
    @User() user_id: number,
    @Res() res: Response,
  ) {
    this.cartService.findSameProductInCart(user_id, prod_id).then(async (sameList) => {
      if (typeof sameList === "undefined") {
        return this.cartService.addToCart(user_id, prod_id).then(({ raw }) => {
          if (raw && raw.affectedRows > 0) {
            return res.status(201).send({
              status: "Added",
              code: 201,
            });
          }
          res.status(400).send({
            status: "Add to cart failed",
            code: 400,
          });
        });
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
            return response.status(OK).send({ code: OK, status: "Deleted" });
          }
          response.status(BAD).send({ code: BAD, status: "Failed" });
        });
      }
      this.cartService.removeFromCart(cart_id).then(({ affected }) => {
        if (affected > 0) {
          return response.send({ code: OK, status: "Deleted" });
        }
        response.status(400).send({ code: BAD, status: "Failed" });
      });
    });
  }
}
