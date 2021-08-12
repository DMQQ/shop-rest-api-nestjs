import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { RatingsDto } from "./dto/ratings.dto";
import { RatingsService } from "./ratings.service";
import { Request } from "express";

@Controller("ratings")
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Get()
  getAllRatings() {
    return this.ratingsService.getAll();
  }

  @Post("/add")
  createRating(@Body() props: any, @Req() req: Request | any) {
    // to add review user need to purchase product
    // history_id goes from history
    // prod_id goes from history

    const user_id = req.user_id;

    const { rating, title, description } = props;

    this.ratingsService
      .addReview({ rating, title, description, user_id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
}
