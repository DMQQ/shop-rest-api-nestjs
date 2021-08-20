import { Body, Controller, Post, Req } from "@nestjs/common";
import { NotificationsDto } from "./dto/notifications.dto";
import { NotificationsService } from "./notifications.service";

@Controller("notifications")
export class NotificationsController {
  constructor(private notifiService: NotificationsService) {}

  @Post("/upload-token")
  uploadToken(@Body() props: NotificationsDto, @Req() req: any) {
    const { user_id } = req;
  }
}
