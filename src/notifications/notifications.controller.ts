import { Body, Controller, Post, Req, Res, Get } from "@nestjs/common";
import { NotificationsDto } from "./dto/notifications.dto";
import { NotificationsService } from "./notifications.service";
import { Response } from "express";
import { RequestExtend } from "src/@types/types";

@Controller("notifications")
export class NotificationsController {
  constructor(private notifiService: NotificationsService) {}

  @Post("/upload-token")
  async uploadToken(
    @Body() props: NotificationsDto,
    @Req() { user_id }: RequestExtend,
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
      response.send({ status: 400, message: "token already exists" });
    });
  }

  @Post("/settings")
  notificationsSettings(
    @Body("enable") enable: boolean,
    @Req() { user_id }: RequestExtend,
  ) {
    this.notifiService.notificationsSettings(enable, user_id);
  }

  @Get("/status")
  getUserNotificationStatus(@Req() { user_id }: RequestExtend) {
    return this.notifiService.getUserStatus(user_id);
  }
}
