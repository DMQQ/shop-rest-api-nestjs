import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import {
  Auction,
  AuctionCreate,
  AuctionCreateResponse,
  AuctionUpdate,
  AuctionUpdateInput,
  BidCreate,
  BidCreateResponse,
  Bids,
} from "./auction.entity";
import { AuctionsService } from "./auctions.service";

@Resolver(() => Auction)
export class AuctionResolver {
  constructor(private readonly auctionService: AuctionsService) {}

  @Query(() => [Auction], { nullable: false })
  auctions(
    @Args("user", { nullable: true, type: () => Int }) user: number,
    @Args("skip", { nullable: true, type: () => Int, defaultValue: 0 }) skip: number,
    @Args("take", { nullable: true, type: () => Int, defaultValue: 5 }) take: number,
    @Args("active", { nullable: true, type: () => Boolean }) active = true,
    @Args("title", { type: () => String, nullable: true }) title: string,
    // @Args("order", { nullable: true, type: () => Sort }) order: keyof typeof Sort,
  ) {
    return this.auctionService.getAuctions({ user, skip, take, active, title });
  }

  @Query(() => [Auction])
  async wonAuctions(@User() user: number) {
    return this.auctionService.getWonAuction(user);
  }

  @Query(() => [Auction])
  async pendingAuctions(@User() user: number) {
    return this.auctionService.getPendingAuctions(user);
  }

  @Query(() => Auction)
  async auction(@Args("auction_id", { nullable: false, type: () => ID }) auction_id: string) {
    return this.auctionService.getAuction(auction_id);
  }

  @ResolveField("bids", () => [Bids])
  bids(
    @Parent() parent: Auction,
    @Args("skip", { type: () => Int, nullable: true }) skip: number,
    @Args("take", { type: () => Int, nullable: true }) take: number,
  ) {
    return this.auctionService.getBids(parent.auction_id, { skip, take });
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
    } catch (error: any) {
      throw new BadRequestException(error?.message);
    }
  }

  @Mutation(() => AuctionCreateResponse)
  async createAuction(
    @Args("auction", { nullable: false, type: () => AuctionCreate }) input: AuctionCreate,
    @User() seller: number,
  ) {
    const isProductOwner = await this.auctionService.isProductOwner(input.product, seller);

    if (!isProductOwner) {
      throw new ForbiddenException("You are not the owner of this product");
    }

    const insertResult = await this.auctionService.createAuction({ ...input, seller });

    const auction = await this.auctionService.getAuction(insertResult.generatedMaps[0].auction_id);

    return {
      ...auction,
      ...insertResult.generatedMaps[0],
    };
  }

  @Mutation(() => AuctionUpdate)
  async updateAuction(
    @Args("auction_id", { nullable: false, type: () => ID }) auction_id: string,
    @Args("auction", { nullable: false }) auction: AuctionUpdateInput,
  ) {
    await this.auctionService.updateAuction(auction_id, auction);

    return auction;
  }
}
