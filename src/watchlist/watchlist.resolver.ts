import { Args, Field, Int, Mutation, ObjectType, Query, Resolver } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import { WatchlistEntity } from "./watchlist.entity";
import { WatchlistService } from "./watchlist.service";
import { BadRequestException } from "@nestjs/common";

@ObjectType()
class WatchlistRemoveType {
  @Field(() => Int)
  affected: number;

  @Field(() => Int)
  prod_id: number;
}

@ObjectType()
class WatchlistCheck {
  @Field(() => Int)
  prod_id: number;

  @Field(() => Boolean)
  isIn: boolean;
}

@Resolver(() => WatchlistEntity)
export class WatchlistResolver {
  constructor(private watchlistService: WatchlistService) {}

  @Query(() => [WatchlistEntity], { defaultValue: [] })
  async watchlist(
    @Args("skip", { nullable: true, type: () => Int }) skip: number,
    @User() id: number,
  ) {
    const data = await this.watchlistService.getWatchlist(id, skip);

    return data;
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
      console.log(error);
    }
  }

  @Mutation(() => WatchlistEntity)
  async watchlistAppendItem(
    @Args("prod_id", { nullable: false, type: () => Int }) prod_id: number,
    @User() id: number,
  ) {
    try {
      const { generatedMaps } = await this.watchlistService.addWatchlistProduct(id, prod_id);

      if (generatedMaps.length < 1) throw new BadRequestException();

      return await this.watchlistService.getOne(generatedMaps[0].id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException({
        message: error,
        statusCode: 400,
      });
    }
  }
}
