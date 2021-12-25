import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { RatingsDto } from "./dto/ratings.dto";
import { RatingsService } from "./ratings.service";
import { Response } from "express";
import { HistoryService } from "src/history/history.service";
import User from "src/decorators/User";

@Controller("ratings")
export class RatingsController {
  constructor(
    private ratingsService: RatingsService,
    private historyService: HistoryService,
  ) {}

  @Get()
  getAllRatings() {
    return this.ratingsService.getAll();
  }

  @Post()
  createRating(
    @Body() props: RatingsDto,
    @User() user_id: number,
    @Res() response: Response,
  ) {
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
