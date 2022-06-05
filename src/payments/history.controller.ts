import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
  Get,
  UseInterceptors,
  Req,
  Res,
} from "@nestjs/common";
import { HistoryDto } from "./dto/history.dto";
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
  async createPayment(@Body() { prod_id, user_id }: HistoryDto, @Res() response: Response) {
    try {
      const total = await this.historyService.getTotalPriceOfSelectedProducts(prod_id);

      const paymentIntent = await this.historyService.createIntent(total, {
        prod_id: JSON.stringify({ prod_id }),
        user_id: user_id.toString(),
      });

      response.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.log(error);
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

      await this.historyService.savePurchase({
        products,
        user_id,
        total_price: amount / 100,
        client_secret,
        payment_method,
      });

      await this.notifyService.purchaseNotification(user_id);

      await this.cartService.removeAllRelatedToUser(user_id);

      try {
        await this.historyService.decreaseProductAmount(products);
      } catch (error) {}

      response.send({
        finished: true,
      });
    } else {
      response.send({
        received: true,
      });
    }
  }
}
