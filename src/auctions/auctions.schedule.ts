import { Injectable } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { Mailer } from "../utils/Mail/Mailer";
import { AuctionsService } from "./auctions.service";

@Injectable()
export class AuctionsSchedule {
  constructor(private auctionService: AuctionsService, private mailService: Mailer) {}

  @Cron("0 0 0 * *", { timeZone: "Europe/Warsaw" })
  async auctionsSchedule() {
    let activeAuctions = await this.auctionService.getActiveAuctions();

    activeAuctions.forEach(async (auction) => {
      if (!this.auctionService.hasNotPassed(auction.date_end as string)) {
        try {
          let [highest] = await this.auctionService.getAuctionHighest(auction.auction_id);

          await this.auctionService.endAuction(auction.auction_id, highest.user);

          const [winner] = await this.auctionService.getAuctionWinner(auction.auction_id);

          const [seller] = await this.auctionService.getAuctionSeller(auction.auction_id);

          await this.mailService.notifyAuctionEndToSeller(
            seller.email,
            auction.product.title,
            +highest.amount,
          );

          await this.mailService.notifyAuctionEnd(
            winner.email,
            auction.auction_id,
            auction.product.title,
          );
        } catch (error) {
          console.warn(error);
        }
      }
    });
  }
}
