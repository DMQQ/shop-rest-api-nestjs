import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { HistoryDto } from "./dto/history.dto";
import { HistoryService } from "./history.service";
import { Request, Response } from "express";

@Controller("history")
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get(":user_id")
  getYourPurchaseHistory(@Param("user_id") id: number) {
    this.historyService.getHistory(id);
  }

  @Post("/purchase")
  createPurchaseHistory(
    @Body() props: HistoryDto,
    @Req() req: Request | any,
    @Res() res: Response,
  ) {
    const { prod_id } = props;
    const { user_id } = req;
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullTime = `${day}.${month}.${year}`;

    const data = {
      date: fullTime,
      user_id,
      prod_id,
      status: "finished",
    };

    this.historyService.addHistory(data).then((response) => {
      console.log(response);

      res.send({
        status: "finished",
        code: 201,
      });
    });
  }
}
