import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { Auction, Bids } from "./auction.entity";
import { AuctionProps, BidProps, AuctionParams } from "./auction.interface";

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auction) private auctionRepository: Repository<Auction>,
    @InjectRepository(Bids) private bidsRepository: Repository<Bids>,
    @InjectConnection() private connection: Connection,
  ) {}

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

  getAuctionSeller(auction_id: string) {
    return this.connection.query(
      "SELECT email from users where users.id = (SELECT seller from auction where auction_id = ?)",
      [auction_id],
    );
  }

  getAuctionHighest(auction_id: string) {
    return this.connection.query("SELECT MAX(amount) FROM bids WHERE auction_id = ?", [auction_id]);
  }

  async endAuctionTransaction(auction_id: string) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const [highestBid] = await queryRunner.manager.query(
        "SELECT Max(amount),user from bids WHERE bids.auction_id = ?",
        [auction_id],
      );

      await queryRunner.manager.update(
        Auction,
        { auction_id },
        {
          active: false,
          winner: highestBid.user,
        },
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      console.warn(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // skip,take doesnt work
  getAuctions({ user, skip = 0, take = 5, active }: AuctionParams) {
    return this.auctionRepository.find({
      relations: ["product", "product.img_id", "bids"],
      where: {
        ...(!!user && { seller: user }),
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
}
