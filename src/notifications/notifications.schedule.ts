import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { NotificationsService } from "./notifications.service";

@Injectable()
export class NotificationsSchedule {
  constructor(private notifyService: NotificationsService) {}
}
