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
        await this.auctionService.endAuctionTransaction(auction.auction_id);

        const [winner] = await this.auctionService.getAuctionWinner(
          "02ba56d8-ee30-47b4-9dc5-fd8970dfa13c",
        );

        const [total] = await this.auctionService.getAuctionHighest(
          "02ba56d8-ee30-47b4-9dc5-fd8970dfa13c",
        );

        const [seller] = await this.auctionService.getAuctionSeller(auction.auction_id);

        await this.mailService.notifyAuctionEndToSeller(
          seller.email,
          (auction.product as any).title,
          +total["MAX(amount)"],
        );

        await this.mailService.notifyAuctionEnd(
          winner.email,
          auction.auction_id,
          (auction.product as any).title,
        );
      }
    });
  }
}
