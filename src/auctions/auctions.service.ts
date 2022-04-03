import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { Auction, Bids } from "./auction.entity";
import { AuctionProps, BidProps } from "./auction.interface";

interface AuctionParams {
  user?: number;
}

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
    });
  }

  // skip,take doesnt work
  getAuctions({ user }: AuctionParams) {
    return this.auctionRepository
      .createQueryBuilder("au")
      .leftJoinAndSelect("au.product", "prod")
      .leftJoinAndSelect("prod.img_id", "img")
      .leftJoinAndSelect("au.bids", "bids")
      .orderBy("bids.amount", "DESC")
      .where("au.seller = :user OR TRUE", { user })
      .getMany();
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

    if (props.amount > (+highest?.amount || 0)) {
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
