import { Query, Resolver } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import { RatingsEntity } from "./ratings.entity";
import { RatingsService } from "./ratings.service";

@Resolver(() => RatingsEntity)
export class RatingsResolver {
  constructor(private ratingsService: RatingsService) {}

  @Query(() => [RatingsEntity])
  ratings(@User() id: number) {
    return this.ratingsService.getUsersReviews(id);
  }
}
