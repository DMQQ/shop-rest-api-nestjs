import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { HistoryDto } from "./dto/history.dto";
import { HistoryService } from "./history.service";
import { Request, Response } from "express";
import { CartService } from "src/cart/cart.service";
import { NotificationsService } from "src/notifications/notifications.service";
import { expo } from "src/notifications/methods";

interface RequestExtend extends Request {
  user_id: number;
}

@Controller("payments")
export class HistoryController {
  constructor(
    private historyService: HistoryService,
    private cartService: CartService,
    private notifyService: NotificationsService,
  ) {}

  @Get("/history")
  async getYourPurchaseHistory(
    @Req() { user_id: id }: RequestExtend,
    @Res() response: Response,
  ) {
    return this.historyService.getHistory(id).then((result) => {
      return response.send(
        result.map((prod: any) => ({
          ...prod.prod_id,
          img_id: prod.img_id,
          history_id: prod.history_id,
          date: prod.date,
          status: prod.status,
        })),
      );
    });
  }

  @Post("/purchase")
  createPurchaseHistory(
    @Body() { prod_id }: HistoryDto,
    @Req() { user_id }: RequestExtend,
    @Res() res: Response,
  ) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullTime = `${year}-${month}-${day}`;

    this.historyService
      .addHistory(prod_id, { user_id, date: fullTime })
      .then(async (result) => {
        if (result === "finished") {
          try {
            await this.cartService.removeAllRelatedToUser(user_id);

            this.notifyService.getUserToken(user_id).then(async ({ token }) => {
              const res = await expo.sendPushNotificationsAsync([
                {
                  to: token,
                  sound: "default",
                  body: `You have bought ${prod_id.length} products`,
                  title: "Thank you for purchase",
                },
              ]);
              console.log(res);
            });
          } catch (error) {
            res
              .status(400)
              .send({ message: "Request Failed, try again", code: 400 });
          }
          return res.status(201).send({ message: "Success", code: 201 });
        }
        res.status(400).send({ message: "Failed", code: 400 });
      });
  }
}
