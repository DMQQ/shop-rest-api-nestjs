import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import User from "../utils/decorators/User";
import { WatchlistService } from "./watchlist.service";

@Controller("watchlist")
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  @Get()
  getUsersWatchlist(@User() user_id: number) {
    return this.watchlistService.getWatchlistREST(user_id);
  }

  @Delete("/:prod_id")
  async deleteFromWatchlist(@User() user_id: number, @Param("prod_id") prod_id: number) {
    try {
      const res = await this.watchlistService.remove(user_id, prod_id);

      if (res.affected > 0) {
        return {
          statusCode: 200,
          message: "Removed",
        };
      }
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post("check")
  async checkProduct(@User() user_id: number, @Body("prod_id") prod_id: number) {
    return this.watchlistService.checkIfProdIsIn(user_id, prod_id).then((res) => ({
      isIn: typeof res !== "undefined",
    }));
  }

  @Post()
  async addProductWatchlist(@User() id: number, @Body("prod_id", ParseIntPipe) prod_id: number) {
    try {
      await this.watchlistService.save(id, prod_id);

      return {
        statusCode: 201,
        message: "Product added to watchlist",
      };
    } catch (error) {
      throw new BadRequestException({
        message: "Something went wrong",
      });
    }
  }
}
