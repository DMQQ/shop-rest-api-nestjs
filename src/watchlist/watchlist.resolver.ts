import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import { WatchlistEntity } from "./watchlist.entity";
import { WatchlistService } from "./watchlist.service";
import { BadRequestException } from "@nestjs/common";
import { WatchlistCheck, WatchlistRemoveType } from "./watchlist.entity";

@Resolver(() => WatchlistEntity)
export class WatchlistResolver {
  constructor(private watchlistService: WatchlistService) {}

  @Query(() => [WatchlistEntity], { defaultValue: [] })
  async watchlist(
    @Args("skip", { nullable: true, type: () => Int }) skip: number,
    @User() id: number,
  ) {
    return this.watchlistService.getWatchlist(id, skip);
  }

  @Query(() => WatchlistCheck)
  async watchlistCheckItem(
    @Args("prod_id", { type: () => Int }) prod_id: number,
    @User() id: number,
  ) {
    const result = await this.watchlistService.checkIfProdIsIn(id, prod_id);

    return {
      prod_id,
      isIn: typeof result !== "undefined",
    };
  }

  @Mutation(() => WatchlistRemoveType)
  async watchlistRemoveItem(
    @Args("prod_id", { type: () => Int }) prod_id: number,
    @User() user_id: number,
  ) {
    try {
      const { affected } = await this.watchlistService.removeById(prod_id, user_id);

      return {
        affected,
        prod_id,
      };
    } catch (error) {
      throw new BadRequestException({
        message: "Error while removing item from watchlist",
      });
    }
  }

  @Mutation(() => WatchlistEntity)
  async watchlistAppendItem(
    @Args("prod_id", { nullable: false, type: () => Int }) prod_id: number,
    @User() id: number,
  ) {
    try {
      const { generatedMaps } = await this.watchlistService.save(id, prod_id);

      if (generatedMaps.length < 1) throw new BadRequestException();

      return await this.watchlistService.getOne(generatedMaps[0].id);
    } catch (error) {
      throw new BadRequestException({
        message: error,
      });
    }
  }
}
