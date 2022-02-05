import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { NotificationsService } from "./notifications.service";
import { expo } from "./methods";

@Injectable()
export class NotificationsSchedule {
  constructor(private notifyService: NotificationsService) {}

  @Interval(1000 * 60 * 15)
  interval() {
    this.notifyService.findUsersToken(1).then(async (res) => {
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
}
