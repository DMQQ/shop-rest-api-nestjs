import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Post,
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
    return this.historyService.getHistory(id).then(([result]) => {
      return {
        hasMore: false,
        results: result.map((prod: any) => ({
          product: {
            prod_id: prod.prod_id.prod_id,
            title: prod.prod_id.title,
            price: prod.prod_id.price,
            img_id: prod.img_id,
          },
          details: {
            purchase_id: prod.history_id,
            date: prod.date,
            status: prod.status,
          },
        })),
      };
    });
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

      try {
        await this.historyService.savePurchase({
          amount: amount / 100,
          client_secret,
          products,
          user_id,
          payment_method,
        });
      } catch (error) {
        console.log(error);
        response.status(400).send({
          error: error,
        });
      }

      await this.notifyService.purchaseNotification(user_id);

      await this.cartService.removeAllRelatedToUser(user_id);

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
