import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WatchlistController } from "./watchlist.controller";
import { WatchlistEntity } from "./watchlist.entity";
import { WatchlistResolver } from "./watchlist.resolver";
import { WatchlistService } from "./watchlist.service";

@Module({
  imports: [TypeOrmModule.forFeature([WatchlistEntity])],
  controllers: [WatchlistController],
  providers: [WatchlistService, WatchlistResolver],
})
export class WatchlistModule {}
