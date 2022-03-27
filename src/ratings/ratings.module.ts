import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingsController } from "./ratings.controller";
import { RatingsEntity } from "./ratings.entity";
import { RatingsService } from "./ratings.service";
import { UsersModule } from "../users/users.module";
import { HistoryModule } from "../payments/history.module";
import { RatingsResolver } from "./ratings.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([RatingsEntity]), UsersModule, HistoryModule],
  providers: [RatingsService, RatingsResolver],
  controllers: [RatingsController],
  exports: [RatingsService],
})
export class RatingsModule {}
