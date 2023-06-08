import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import User from "../utils/decorators/User";
import { PagingInterceptor } from "../utils/functions/PagingInterceptor";
import { WatchlistService } from "./watchlist.service";

@Controller("watchlist")
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  @Get()
  @UseInterceptors(PagingInterceptor)
  getUsersWatchlist(@User() user_id: number, @Query("skip") skip: number = 0) {
    return this.watchlistService.getWatchlistREST(user_id, skip);
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

      const product = await this.watchlistService.getWatchlistProductById(prod_id);

      return {
        statusCode: 201,
        message: "Product added to watchlist",
        product: product,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: 400,
        message: "Something went wrong",
        error: "Product is already in watchlist",
      });
    }
  }
}
