import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";

import { NotificationsService } from "./notifications.service";

import { expo } from "./methods";

@Injectable()
export class NotificationsSchedule {
  constructor(private notifyService: NotificationsService) {}

  // 15 minutes
  @Interval(1000 * 60 * 15)
  handleCron() {
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
}
