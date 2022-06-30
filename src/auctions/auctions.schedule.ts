import { Injectable } from "@nestjs/common";
import { Cron, Timeout } from "@nestjs/schedule";
import { Mailer } from "../utils/Mail/Mailer";
import { AuctionsService } from "./auctions.service";

function hasPassed(date: string): boolean {
  const current = new Date().toLocaleDateString();

  const [day, month, year] = current.split(".");

  const [day2, month2, year2] = date.split(".");

  return (
    year2 > year ||
    (year2 === year && month2 > month) ||
    (year2 === year && month2 === month && day2 > day)
  );
}

@Injectable()
export class AuctionsSchedule {
  constructor(private auctionService: AuctionsService, private mailService: Mailer) {}

  @Cron("0 0 0 * *", { timeZone: "Europe/Warsaw" })
  async auctionsSchedule() {
    let activeAuctions = await this.auctionService.getActiveAuctions();

    activeAuctions.forEach(async (auction) => {
      if (!hasPassed(auction.date_end as string)) {
        let [total] = (await this.auctionService.getAuctionHighest(auction.auction_id)) as any;
        total = +total.amount as number;

        await this.auctionService.endAuction(auction.auction_id, total.user);

        const [winner] = await this.auctionService.getAuctionWinner(auction.auction_id);

        const [seller] = await this.auctionService.getAuctionSeller(auction.auction_id);

        await this.mailService.notifyAuctionEndToSeller(seller.email, auction.product.title, total);

        await this.mailService.notifyAuctionEnd(
          winner.email,
          auction.auction_id,
          auction.product.title,
        );
      }
    });
  }
}
