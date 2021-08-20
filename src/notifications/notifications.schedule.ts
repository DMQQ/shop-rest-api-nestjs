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
        const ticket = await expo.sendPushNotificationsAsync([
          {
            to: res.token,
            data: { data: { data: "Hello user" } },
            body: `If you see this message it means my app is working`,
            title: "Hi user",
          },
        ]);
        console.log(ticket);
      }
    });
  }
}
