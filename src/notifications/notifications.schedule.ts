import { Injectable } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";

import { NotificationsService } from "./notifications.service";

import { expo } from "./methods";
import { CartService } from "src/cart/cart.service";

@Injectable()
export class NotificationsSchedule {
  constructor(
    private notifyService: NotificationsService,
    private cartService: CartService,
  ) {}

  // 15 minutes
  @Interval(1000 * 60 * 150)
  interval() {
    this.notifyService.findUsersToken(5).then(async (res) => {
      if (res) {
        const ticket = await expo.sendPushNotificationsAsync([
          {
            to: res.token,
            data: { data: "Hello mate" },
            body: `If you see this message it means my app is working`,
            title: "Hi Bro",
          },
        ]);
        console.log(ticket);
      }
    });
  }

  @Cron("* * 12 * * *")
  cartReminder() {}
}
