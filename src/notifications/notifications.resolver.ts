import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import { UploadTokenQL } from "./dto/notifications.fields";
import { NotificationsEntity } from "./notifications.entity";
import { NotificationsService } from "./notifications.service";

@Resolver()
export class NotificationsResolver {
  constructor(private notifiRepo: NotificationsService) {}

  @Query(() => NotificationsEntity)
  getNotificationStatus(@User() id: number) {
    return this.notifiRepo.getUserToken(id);
  }

  @Mutation(() => UploadTokenQL)
  async toggleNotificationToken(@User() id: number, @Args("enable") enable: boolean) {
    await this.notifiRepo.notificationsSettings(enable, id);

    return {}; // to be fixed
  }

  @Mutation(() => UploadTokenQL)
  async postNotificationToken(
    @Args("token", { nullable: false }) token: string,
    @User() user_id: number,
  ) {
    const result = await this.notifiRepo.findUsersToken(user_id);

    if (typeof result === "undefined") {
      const { raw } = await this.notifiRepo.pushTokenToDataBase(token, user_id);

      if (raw.affected > 0) {
        return {
          token,
          statusCode: 201,
          message: "Token saved",
        };
      }
    }
    return {
      token,
      statusCode: 400,
      message: "Token already exists",
    };
  }
}
