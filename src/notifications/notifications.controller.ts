import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { NotificationsDto } from "./dto/notifications.dto";
import { NotificationsService } from "./notifications.service";
import { Response } from "express";

@Controller("notifications")
export class NotificationsController {
  constructor(private notifiService: NotificationsService) {}

  @Post("/upload-token")
  async uploadToken(
    @Body() props: NotificationsDto,
    @Req() req: any,
    @Res() response: Response,
  ) {
    const { user_id } = req;

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
}
