import { BadRequestException, Body, Controller, Get, ParseIntPipe, Post } from "@nestjs/common";
import User from "../decorators/User";
import { WatchlistService } from "./watchlist.service";

@Controller("watchlist")
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  @Get()
  getUsersWatchlist(@User() user_id: number) {
    return this.watchlistService.getUsers(user_id);
  }

  @Post("check")
  async checkProduct(@User() user_id: number, @Body("prod_id") prod_id: number) {
    return this.watchlistService.checkIfProdIsIn(user_id, prod_id).then((res) => {
      if (typeof res === "undefined") {
        return {
          isIn: false,
        };
      }
      return {
        isIn: true,
      };
    });
  }

  @Post()
  async addProductWatchlist(@User() id: number, @Body("prod_id", ParseIntPipe) prod_id: number) {
    try {
      await this.watchlistService.addWatchlistProduct(id, prod_id);

      return {
        statusCode: 201,
        message: "Product added to watchlist",
      };
    } catch (error) {
      throw new BadRequestException({
        message: "Something went wrong",
        statusCode: 400,
      });
    }
  }
}
