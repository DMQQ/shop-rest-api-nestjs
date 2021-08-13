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

    // brak zdjęć, do poprawy

    return this.cartService.getUsersCart(user_id);
  }

  @Post("/add-to-cart")
  addToCart(
    @Body("prod_id") prod_id: number,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const { user_id } = req;

    this.cartService.addToCart(user_id, prod_id).then(({ raw }) => {
      if (raw && raw.affectedRows > 0) {
        res.send({
          status: "Added",
          code: 201,
        });
      }
    });
  }

  @Delete(":cart_id")
  removeFromCart(
    @Param("cart_id") cart_id: number,
    @Req() req: IRequest,
    @Res() response: Response,
  ) {
    const { user_id } = req;
    this.cartService
      .removeFromCart(cart_id, user_id)
      .then((res) => {
        if (res.affected > 0) {
          response.status(200).send({ status: "Deleted", code: 200 });
        }
      })
      .catch((err) => {
        response.status(400).send({ error: err.message, code: 400 });
      });
  }
}
