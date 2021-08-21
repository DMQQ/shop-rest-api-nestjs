import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { Request, Response } from "express";
import { IRequest } from "src/ratings/ratings.controller";

@Controller("cart")
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCart(@Req() req: Request | any) {
    const { user_id } = req;

    return this.cartService.getUsersCart(user_id);
  }

  @Post("/add-to-cart")
  addToCart(
    @Body("prod_id") prod_id: number,
    @Req() req: IRequest,
    @Res() res: Response,
  ) {
    const { user_id } = req;

    this.cartService
      .findSameProductInCart(user_id, prod_id)
      .then(async (sameList) => {
        if (typeof sameList === "undefined") {
          return this.cartService
            .addToCart(user_id, prod_id)
            .then(({ raw }) => {
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
            res.send({
              code: 201,
              status: "Added",
            });
          }
        });
      });
  }

  @Delete(":cart_id")
  removeFromCart(@Param("cart_id") cart_id: number, @Res() response: Response) {
    this.cartService.findOneProductInCart(cart_id).then(async (oneProduct) => {
      if (oneProduct.ammount > 1) {
        return this.cartService
          .decreaseAmmount(cart_id, oneProduct.ammount)
          .then((passed) => {
            if (passed.affected > 0) {
              return response
                .status(200)
                .send({ code: 200, status: "Deleted" });
            }
            response.status(400).send({ code: 400, status: "Failed" });
          });
      }
      this.cartService.removeFromCart(cart_id).then((res) => {
        if (res.affected > 0) {
          return response.send({ code: 200, status: "Deleted" });
        }
        response.send({ code: 400, status: "Failed" });
      });
    });
  }
}
