import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
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

  @Get("/history")
  async getYourPurchaseHistory(@Req() req: any, @Res() response: Response) {
    const { user_id: id } = req;
    return this.historyService.getHistory(id).then((result) => {
      const output = [];

      result.forEach((prod: any) => {
        output.push({
          img_id: prod.img_id,
          history_id: prod.history_id,
          date: prod.date,
          status: prod.status,
          ...prod.prod_id,
        });
      });
      response.send(output);
    });
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
