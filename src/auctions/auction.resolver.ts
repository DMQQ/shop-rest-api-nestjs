import { BadRequestException } from "@nestjs/common";
import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import {
  Auction,
  AuctionCreate,
  AuctionCreateResponse,
  BidCreate,
  BidCreateResponse,
} from "./auction.entity";
import { AuctionsService } from "./auctions.service";

@Resolver()
export class AuctionResolver {
  constructor(private readonly auctionService: AuctionsService) {}

  @Query(() => [Auction], { nullable: false })
  auctions(
    @Args("skip", { type: () => Int, nullable: true }) skip: number,
    @Args("take", { type: () => Int, nullable: true }) take: number,
  ) {
    return this.auctionService.getAuctions({ skip, take });
  }

  @Query(() => Auction)
  async auction(@Args("auction_id", { nullable: false, type: () => ID }) auction_id: string) {
    return this.auctionService.getAuction(auction_id);
  }

  @Mutation(() => BidCreateResponse)
  async createBid(@Args("bid", { nullable: false }) props: BidCreate, @User() user: number) {
    try {
      const insertResult = await this.auctionService.addBid({
        ...props,
        user,
      });

      return {
        ...props,
        ...insertResult.generatedMaps[0],
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => AuctionCreateResponse)
  async createAuction(
    @Args("auction", { nullable: false }) auction: AuctionCreate,
    @User() seller: number,
  ) {
    const insertResult = await this.auctionService.createAuction({ ...auction, seller });

    return {
      ...auction,
      ...insertResult.generatedMaps[0],
    };
  }
}
