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
import User from "../decorators/User";

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
      const { history_id } = await this.historyService.getUserPurchasedProduct(
        user_id,
        props.prod_id,
      );

      const { raw } = await this.ratingsService.addReview({ ...props, user_id, history_id });

      if (raw.affectedRows > 0) {
        return response.status(201).send({
          status: "Created",
          code: 201,
        });
      }
    } catch (error) {
      throw new BadRequestException("Purchase product to be able to review it");
    }
  }
}
