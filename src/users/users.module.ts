import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mailer } from "../utils/Mail/Mailer";
import { UsersController } from "./users.controller";
import { UsersEntity } from "./users.entity";
import { UsersService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [Mailer, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
