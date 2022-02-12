import { Body, Controller, forwardRef, Get, Inject, Post, Res } from "@nestjs/common";
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
  createRating(@Body() props: RatingsDto, @User() user_id: number, @Res() response: Response) {
    this.historyService
      .getUsersHistoryByProductId(user_id, props.prod_id)
      .then(async ([result]) => {
        if (typeof result !== "undefined") {
          return this.ratingsService
            .addReview({
              ...props,
              user_id,
              history_id: result?.history_id,
            })
            .then(({ raw }) => {
              if (raw.affectedRows > 0) {
                response.send({
                  status: "Created",
                  code: 201,
                });
              }
            })
            .catch((err) => {
              response.status(400).send({ message: "Failed", error: err });
            });
        }
        response.status(400).send({
          message: "Sorry you have to buy first before adding the review",
        });
      });
  }
}
