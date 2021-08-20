import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import Expo from "expo-server-sdk";
import { NotificationsService } from "./notifications.service";

const expo = new Expo();

@Injectable()
export class NotificationsSchedule {
  constructor(private notifyService: NotificationsService) {}

  @Cron("50 * * * * *")
  handleCron() {
    this.notifyService.findUsersToken(5).then(async (res) => {
      if (res) {
        const date = new Date().toLocaleDateString();
        const hour = new Date().getHours();
        const minutes = new Date().getMinutes();

        const ticket = await expo.sendPushNotificationsAsync([
          {
            to: res.token,
            data: { data: { data: "Hi" } },
            body: `${date} ${hour} ${minutes}`,
            title: "Hi mate",
          },
        ]);
        console.log(ticket);
      }
    });
  }
}
