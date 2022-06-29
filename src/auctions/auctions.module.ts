import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Mailer } from "../utils/Mail/Mailer";
import { Auction, Bids } from "./auction.entity";
import { AuctionResolver } from "./auction.resolver";
import { AuctionsSchedule } from "./auctions.schedule";
import { AuctionsService } from "./auctions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Auction, Bids])],
  providers: [AuctionsService, AuctionResolver, AuctionsSchedule, Mailer],
})
export class AuctionsModule {}
