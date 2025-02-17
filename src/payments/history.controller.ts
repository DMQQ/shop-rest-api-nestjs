import { BadRequestException, Controller, Headers, Post, Get, Req, Res } from "@nestjs/common";
import { HistoryService } from "./history.service";
import { Response } from "express";
import { CartService } from "../cart/cart.service";
import { NotificationsService } from "../notifications/notifications.service";

import User from "../utils/decorators/User";

interface BufferRequest extends Request {
  rawBody: Buffer;
}

@Controller("payments")
export class HistoryController {
  constructor(
    private historyService: HistoryService,
    private cartService: CartService,
    private notifyService: NotificationsService,
  ) {}

  @Get("/history")
  async getYourPurchaseHistory(@User() id: number) {
    return this.historyService.getHistoryGQL(id);
  }

  @Post("/create-payment-intent")
  async createPayment(@Res() response: Response, @User() user: number) {
    try {
      const [total, prod_id] = await this.cartService.getTotal(user);

      const paymentIntent = await this.historyService.createIntent(total, {
        prod_id: JSON.stringify({ prod_id }),
        user_id: user.toString(),
      });

      response.send({
        clientSecret: paymentIntent.client_secret,
        total,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post("/webhook")
  async handleEvent(
    @Headers("stripe-signature") signature: string,
    @Res() response: Response,
    @Req() request: BufferRequest,
  ) {
    if (!signature) throw new BadRequestException("Missing stripe-signature header");

    const event = this.historyService.constructEventPayload(signature, request.rawBody);

    if (event.type === "payment_intent.succeeded") {
      const details = event.data.object as any;

      const { amount, metadata, client_secret, payment_method } = details;

      const products = JSON.parse(metadata.prod_id)?.prod_id;
      const user_id = Number(metadata.user_id);

      const props = {
        client_secret,
        user_id,
        products,
        payment_method,
        total_price: amount,
      };

      await this.historyService.purchase(props);

      try {
        await this.notifyService.purchaseNotification(user_id);
      } catch {}

      response.send({
        finished: true,
      });
    } else {
      console.log("Unhandled event: ", event.type);

      response.send({
        received: true,
      });
    }
  }
}
