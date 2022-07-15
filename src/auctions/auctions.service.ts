import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, Like, Repository } from "typeorm";
import { ProductsEntity } from "../products/entities/products.entity";
import { Auction, Bids } from "./auction.entity";
import { AuctionProps, BidProps, AuctionParams } from "./auction.interface";

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction) private auctionRepository: Repository<Auction>,
    @InjectRepository(Bids) private bidsRepository: Repository<Bids>,
    @InjectConnection() private connection: Connection,
  ) {}

  hasNotPassed(date: string): boolean {
    const current = new Date().toLocaleDateString();

    const [day, month, year] = current.split(".");

    const [day2, month2, year2] = date.split(".");

    return (
      year2 > year ||
      (year2 === year && month2 > month) ||
      (year2 === year && month2 === month && day2 > day)
    );
  }

  getBids(auction_id: string, { skip = 0, take = 5 }) {
    return this.bidsRepository.find({
      where: {
        auction_id,
      },
      skip,
      take,
      order: {
        amount: "DESC",
      },
    });
  }

  getPendingAuctions(user_id: number) {
    return this.auctionRepository.find({
      relations: ["product", "product.img_id", "bids"],
      where: {
        seller: user_id,
        active: true,
      },
    });
  }

  getWonAuction(user_id: number) {
    return this.auctionRepository.find({
      relations: ["product", "product.img_id", "bids"],
      where: {
        winner: user_id,
      },
    });
  }

  getActiveAuctions() {
    return this.auctionRepository.find({
      where: { active: true },
      relations: ["product"],
    });
  }

  getAuctionWinner(auction_id: string) {
    return this.connection.query(
      "SELECT email from users where users.id = (SELECT winner from auction where auction_id = ?)",
      [auction_id],
    );
  }

  getAuctionSeller(auction_id: string): Promise<[{ email: string }]> {
    return this.connection.query(
      "SELECT email from users where users.id = (SELECT seller from auction where auction_id = ?)",
      [auction_id],
    );
  }

  getAuctionHighest(auction_id: string): Promise<[{ amount: string; user: number }]> {
    return this.connection.query(
      "SELECT MAX(amount) as amount,user FROM bids WHERE auction_id = ?",
      [auction_id],
    );
  }

  endAuction(auction_id: string, winner: number) {
    return this.auctionRepository.update({ auction_id }, { active: false, winner });
  }

  // skip,take doesnt work
  getAuctions({ user, skip = 0, take = 5, active, title }: AuctionParams) {
    return this.auctionRepository.find({
      relations: ["product", "product.img_id", "bids"],
      where: {
        ...(!!user && { seller: user }),
        ...(!!active && { active }),
        ...(!!title && { product: { title: Like(`%${title}%`) } }),
      },
      order: {
        date_end: "DESC",
      },
      skip: skip,
      take: take,
    });
  }

  getAuction(auction_id: string) {
    return this.auctionRepository
      .createQueryBuilder("au")
      .leftJoinAndSelect("au.product", "prod")
      .leftJoinAndSelect("prod.img_id", "img")
      .leftJoinAndSelect("au.bids", "bids")
      .where("au.auction_id = :auction_id", { auction_id })
      .orderBy("bids.amount", "DESC")
      .getOne();
  }

  createAuction(props: AuctionProps) {
    return this.auctionRepository.insert(props);
  }

  isSeller(auction_id: string) {
    return this.auctionRepository.findOne({
      where: {
        auction_id,
      },
    });
  }

  /**
   * Returns result if request succeded or throws an error if provided bid amount is lower than highest auction bid  */
  async addBid(props: BidProps) {
    const highest = await this.bidsRepository.findOne({
      where: { auction_id: props.auction_id },
      order: {
        amount: "DESC",
      },
    });

    const amount = highest?.amount !== undefined ? +highest.amount : 0;

    /*   const seller = await this.isSeller(props.auction_id);

    if (seller.seller === props.user) throw new Error("You cannot bid on your own auction");
 */

    if (props.amount > amount) {
      const { generatedMaps } = await this.bidsRepository.insert(props);
      const bidId = generatedMaps[0].bid_id;

      await this.connection.query("INSERT INTO auction_bids_bids(auction_id,bid_id) VALUES (?,?)", [
        props.auction_id,
        bidId,
      ]);

      return { generatedMaps };
    }

    throw new Error("Price too low");
  }

  isProductOwner(prod_id: number, user_id: number) {
    return this.connection.manager.findOne(ProductsEntity, {
      select: ["vendor", "prod_id"],
      where: {
        prod_id,
        user_id,
      },
    });
  }

  updateAuction(auction_id: string, props: Partial<Omit<AuctionProps, "product" | "seller">>) {
    return this.auctionRepository.update({ auction_id }, props);
  }
}
