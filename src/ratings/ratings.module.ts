import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingsController } from "./ratings.controller";
import { RatingsEntity } from "./ratings.entity";
import { RatingsService } from "./ratings.service";
import { UsersModule } from "src/users/users.module";
import { HistoryModule } from "src/history/history.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([RatingsEntity]),
    UsersModule,
    HistoryModule,
  ],
  providers: [RatingsService],
  controllers: [RatingsController],
  exports: [RatingsService],
})
export class RatingsModule {}
