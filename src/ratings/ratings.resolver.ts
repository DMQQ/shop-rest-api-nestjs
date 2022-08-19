import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import { CreateRatingsInput, RatingsEntity } from "./ratings.entity";
import { RatingsService } from "./ratings.service";
import { HistoryService } from "../payments/history.service";

import { BadRequestException } from "@nestjs/common";

@Resolver(() => RatingsEntity)
export class RatingsResolver {
  constructor(private ratingsService: RatingsService, private historyService: HistoryService) {}

  @Query(() => [RatingsEntity])
  ratings(@User() id: number, @Args("skip", { type: () => Int, nullable: true }) skip: number) {
    return this.ratingsService.getUsersReviews(id, skip);
  }

  @Mutation(() => RatingsEntity)
  async createRating(
    @Args("rating", { type: () => CreateRatingsInput }) rating: CreateRatingsInput,
    @User() user_id: number,
  ) {
    try {
      await this.historyService.hasPurchased(user_id, rating.prod_id);

      const result = await this.ratingsService.hasReviewed(user_id, rating.prod_id);

      if (typeof result !== "undefined") {
        throw new BadRequestException({
          statusCode: 400,
          message: "You can't post more than one review per product ",
        });
      }

      const insert = await this.ratingsService.addReview({ ...rating, user_id });

      return {
        ...rating,
        rating_id: insert.generatedMaps[0].rating_id,
      };
    } catch (error) {
      throw new BadRequestException("You must purchase product before reviewing");
    }
  }
}
