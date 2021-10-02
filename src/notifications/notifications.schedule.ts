import { Injectable } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { NotificationsService } from "./notifications.service";
import { expo } from "./methods";

@Injectable()
export class NotificationsSchedule {
  constructor(private notifyService: NotificationsService) {}

  @Interval(1000 * 60 * 5)
  interval() {
    this.notifyService.findUsersToken(5).then(async (res) => {
      if (res) {
        const ticket = await expo.sendPushNotificationsAsync([
          {
            to: res.token,
            data: { data: "Hello mate" },
            body: `Backend Status OK`,
            title: "React Native shop application",
          },
        ]);
        console.log(ticket);
      }
    });
  }

  @Cron("* * 12 * * *")
  cartReminder() {
    this.notifyService.getTokens().then(async (tokens) => {
      const messages = tokens.map(({ token }) => ({
        to: token,
        title: "Check your cart mate",
        body: "You left your cart alone",
      }));
      const ticket = await expo.sendPushNotificationsAsync(messages);

      console.log(ticket);
    });
  }
}
