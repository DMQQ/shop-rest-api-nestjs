import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WatchlistController } from "./watchlist.controller";
import { WatchlistEntity } from "./watchlist.entity";
import { WatchlistService } from "./watchlist.service";

@Module({
  imports: [TypeOrmModule.forFeature([WatchlistEntity])],
  controllers: [WatchlistController],
  providers: [WatchlistService],
})
export class WatchlistModule {}
