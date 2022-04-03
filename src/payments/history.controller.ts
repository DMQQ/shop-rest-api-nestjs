import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { HistoryDto } from "./dto/history.dto";
import { HistoryService } from "./history.service";
import { Response } from "express";
import { CartService } from "../cart/cart.service";
import { NotificationsService } from "../notifications/notifications.service";
import { expo } from "../notifications/methods";
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
  async createPayment(@Body() { prod_id }: HistoryDto, @Res() response: Response) {
    try {
      const total = await this.historyService.getTotalPriceOfSelectedProducts(prod_id);

      const paymentIntent = await this.historyService.createIntent(total);

      response.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {}
  }

  @Post("/webhook")
  async handleEvent(@Headers("stripe-signature") signature: string, @Req() request: BufferRequest) {
    if (!signature) throw new BadRequestException("Missing stripe-signature header");

    const event = this.historyService.constructEventPayload(signature, request.rawBody);

    switch (event.type) {
      case "payment_intent.succeeded":
        try {
        } catch (error) {}
        break;

      default:
        console.log(`unhandled method: ${event.type}`);
        return {};
    }
  }

  @Post("/purchase")
  createPurchaseHistory(
    @Body() { prod_id }: HistoryDto,
    @User() user_id: number,
    @Res() res: Response,
  ) {
    this.historyService
      .addHistory(prod_id, { user_id, date: new Date().toLocaleDateString() })
      .then(async (result) => {
        if (result === "finished") {
          try {
            await this.cartService.removeAllRelatedToUser(user_id);

            this.notifyService.getUserToken(user_id).then(async ({ token }) => {
              if (token) {
                await expo.sendPushNotificationsAsync([
                  {
                    to: token,
                    sound: "default",
                    body: "❤ Purchase copy can be found in your mail box ❤",
                    title: "❤ Thank you for purchase ❤",
                  },
                ]);
              }
            });
          } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).send({
              message: "Request Failed, try again",
              code: HttpStatus.BAD_REQUEST,
            });
          }
          return res
            .status(HttpStatus.CREATED)
            .send({ message: "Success", code: HttpStatus.CREATED });
        }
        res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: "Failed", code: HttpStatus.BAD_REQUEST });
      });
  }
}
