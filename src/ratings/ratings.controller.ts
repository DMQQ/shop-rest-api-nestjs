import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { RatingsDto } from "./dto/ratings.dto";
import { RatingsService } from "./ratings.service";
import { Request, Response } from "express";
import { HistoryService } from "src/history/history.service";

export interface IRequest extends Request {
  user_id: number;
}

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

  @Post("/add")
  createRating(
    @Body() props: RatingsDto,
    @Req() req: IRequest,
    @Res() response: Response,
  ) {
    const { user_id } = req;
    const { rating, title, description, prod_id } = props;

    this.historyService
      .getUsersHistoryByProductId(user_id, prod_id)
      .then(async (result) => {
        if (result.length > 0) {
          return this.ratingsService
            .addReview({
              rating,
              title,
              description,
              user_id,
              history_id: result[0]?.history_id,
              prod_id: prod_id,
            })
            .then((res) => {
              if (res.raw.affectedRows > 0) {
                response.send({
                  status: "Created",
                  code: 201,
                });
              }
            })
            .catch((err) => console.log(err));
        }
        response.status(400).send({
          message: "Sorry but you have to buy to be able to review",
        });
      });
  }
}
