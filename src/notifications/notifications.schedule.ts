import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { NotificationsService } from "./notifications.service";

@Injectable()
export class NotificationsSchedule {
  constructor(private notifyService: NotificationsService) {}

  @Interval(1000 * 60 * 15)
  interval() {
    this.notifyService.single(1, {
      data: { data: "Hello mate" },
      body: `Backend Status OK`,
      title: "React Native shop application",
      ttl: 10,
    });
  }
}
