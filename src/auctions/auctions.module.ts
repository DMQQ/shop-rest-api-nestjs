import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auction, Bids } from "./auction.entity";
import { AuctionResolver } from "./auction.resolver";
import { AuctionsService } from "./auctions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Bids])],
  providers: [AuctionsService, AuctionResolver],
})
export class AuctionsModule {}
