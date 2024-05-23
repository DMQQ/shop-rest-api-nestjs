import {
  BadRequestException,
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  Res,
} from "@nestjs/common";
import { RatingsDto } from "./dto/ratings.dto";
import { RatingsService } from "./ratings.service";
import { Response } from "express";
import { HistoryService } from "../payments/history.service";
import User from "../utils/decorators/User";

@Controller("ratings")
export class RatingsController {
  constructor(
    private ratingsService: RatingsService,
    @Inject(forwardRef(() => HistoryService))
    private historyService: HistoryService,
  ) {}

  @Get()
  getAllRatings() {
    return this.ratingsService.getAll();
  }

  @Get("/my")
  getMyReviews(@User() id: number) {
    return this.ratingsService.getUsersReviews(id);
  }

  @Post()
  async createRating(
    @Body() props: RatingsDto,
    @User() user_id: number,
    @Res() response: Response,
  ) {
    try {
      await this.historyService.hasPurchased(user_id, props.prod_id);

      const result = await this.ratingsService.hasReviewed(user_id, props.prod_id);

      if (typeof result !== "undefined") {
        return response.status(400).send({
          statusCode: 400,
          message: "You can't post more than one review per product ",
        });
      }

      await this.ratingsService.addReview({ ...props, user_id });

      return response.status(201).send({
        status: "Created",
        code: 201,
      });
    } catch (error) {
      throw new BadRequestException("You must purchase product before reviewing");
    }
  }
}
