import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { CartService } from "./cart.service";
import { Request, Response } from "express";

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
}
