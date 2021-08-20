import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationsModule } from "src/notifications/notifications.module";
import { UsersController } from "./users.controller";
import { UsersEntity } from "./users.entity";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]), NotificationsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
