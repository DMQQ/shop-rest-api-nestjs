import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { HistoryDto } from "./dto/history.dto";
import { HistoryService } from "./history.service";
import { Request, Response } from "express";
import { CartService } from "src/cart/cart.service";

@Controller("payments")
export class HistoryController {
  constructor(
    private historyService: HistoryService,
    private cartService: CartService,
  ) {}

  @Get("/history/:user_id")
  getYourPurchaseHistory(@Param("user_id") id: number) {
    this.historyService.getHistory(id);
  }

  @Post("/purchase")
  createPurchaseHistory(
    @Body() props: HistoryDto,
    @Req() req: Request | any,
    @Res() res: Response,
  ) {
    const { prod_id } = props;
    const { user_id } = req;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullTime = `${year}-${month}-${day}`;

    this.historyService
      .addHistory(prod_id, { user_id, date: fullTime })
      .then(async (result) => {
        if (result === "finished") {
          await this.cartService.removeAllRelatedToUser(user_id);
          return res.send({ message: "Success", code: 201 });
        }
        res.send({ message: "Failed", code: 400 });
      });
  }
}
