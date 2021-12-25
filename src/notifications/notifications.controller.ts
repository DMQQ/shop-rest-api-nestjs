import { Body, Controller, Post, Res, Get } from "@nestjs/common";
import { NotificationsDto } from "./dto/notifications.dto";
import { NotificationsService } from "./notifications.service";
import { Response } from "express";
import User from "src/decorators/User";

@Controller("notifications")
export class NotificationsController {
  constructor(private notifiService: NotificationsService) {}

  @Post("/upload-token")
  async uploadToken(
    @Body() props: NotificationsDto,
    @User() user_id: number,
    @Res() response: Response,
  ) {
    this.notifiService.findUsersToken(user_id).then(async (res) => {
      if (typeof res === "undefined") {
        return this.notifiService
          .pushTokenToDataBase(props.token, user_id)
          .then(({ raw }) => {
            if (raw && raw.affected > 0) {
              response
                .status(201)
                .send({ status: 201, message: "token uploaded" });
            }
          });
      }
      response.send({ message: "token already exists" });
    });
  }

  @Post("/settings")
  notificationsSettings(
    @Body("enable") enable: boolean,
    @User() user_id: number,
  ) {
    this.notifiService.notificationsSettings(enable, user_id);
  }

  @Get("/status")
  getUserNotificationStatus(@User() user_id: number) {
    return this.notifiService.getUserStatus(user_id);
  }
}
