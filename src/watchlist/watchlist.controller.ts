import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
    return this.watchlistService.getAllREST(user_id, skip);
  }

  @Delete("/:prod_id")
  async removeWatchlistItem(@User() user_id: number, @Param("prod_id") prod_id: number) {
    try {
      const res = await this.watchlistService.remove(user_id, prod_id);

      if (!res)
        throw new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Something went wrong",
          error: "Could not remove product from watchlist",
        });

      return {
        statusCode: HttpStatus.OK,
        message: "Removed",
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post("check")
  async checkProduct(@User() user_id: number, @Body("prod_id") prod_id: number) {
    const res = await this.watchlistService.isIn(user_id, prod_id);

    return {
      isIn: typeof res !== "undefined",
      statusCode: HttpStatus.OK,
    };
  }

  @Post()
  async addProductWatchlist(@User() id: number, @Body("prod_id", ParseIntPipe) prod_id: number) {
    try {
      await this.watchlistService.saveOne(id, prod_id);

      const product = await this.watchlistService.getOneById(prod_id);

      return {
        statusCode: HttpStatus.CREATED,
        message: "Added to watchlist",
        product: product,
      };
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Something went wrong",
        error: "Product is already in watchlist",
      });
    }
  }
}
