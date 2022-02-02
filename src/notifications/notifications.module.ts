import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "../cart/cart.module";
import { NotificationsController } from "./notifications.controller";
import { NotificationsEntity } from "./notifications.entity";
import { NotificationsSchedule } from "./notifications.schedule";
import { NotificationsService } from "./notifications.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationsEntity]),
    ScheduleModule.forRoot(),
    CartModule,
  ],
  providers: [NotificationsService, NotificationsSchedule],
  controllers: [NotificationsController],
  exports: [NotificationsService],
})
export class NotificationsModule {}
