import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsController } from "./notifications.controller";
import { NotificationsEntity } from "./notifications.entity";
import { NotificationsService } from "./notifications.service";

@Module({
  imports: [TypeOrmModule.forFeature([NotificationsEntity])],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
