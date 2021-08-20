import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
