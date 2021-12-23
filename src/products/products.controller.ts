import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { ProductsDto } from "./dto/products.dto";
import { ProductsService } from "./products.service";
import { Response } from "express";
import { BAD, CREATED, OK } from "src/constants/codes";
import { FAILED_CREATE, SUCCESS_CREATE } from "src/constants/responses";
import { NotificationsService } from "src/notifications/notifications.service";
import { expo, NewProductNotification } from "src/notifications/methods";
import { RequestExtend } from "src/@types/types";
import { RatingsService } from "src/ratings/ratings.service";

@Controller("products")
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private notifyService: NotificationsService,
    private ratingsService: RatingsService,
  ) {}

  @Get()
  async getAllProducts(@Query("skip") skip: number, @Res() response: Response) {
    return this.productsService.getAll(skip).then(([products, ammount]) => {
      response.send({
        hasMore: +skip + 5 < ammount,
        results: products,
      });
    });
  }

  @Get("categories")
  getCategories() {
    return this.productsService.getCategories();
  }

  @Get("searched=:text")
  async getBySearchTitleOrDescription(
    @Param("text") text: string,
    @Req() { user_id }: RequestExtend,
    @Res() response: Response,
  ) {
    return this.productsService.getByTitleOrDesc(text).then((result) => {
      if (typeof result !== "undefined") {
        if (result.length > 0) {
          const [one] = result as any;
          this.productsService.pushSearchHistory(user_id, text, one.prod_id);
        }
        return response.status(OK).send(result);
      }
      response.status(OK).send([]);
    });
  }

  @Get("search-history")
  getSearchHistory(@Req() { user_id }: RequestExtend) {
    return this.productsService.getSearchHistory(user_id);
  }

  @Get("searched-products")
  async getSearchedProducts(
    @Req() { user_id }: RequestExtend,
    @Query("skip") skip: number,
  ) {
    return this.productsService
      .getSearchHistoryProduct(user_id, skip)
      .then(([products, ammount]) => {
        return {
          hasMore: +skip + 5 < ammount,
          results: products,
        };
      });
  }

  @Get("/category=:category")
  getProductsByCategory(@Param("category") category: string) {
    return this.productsService.getByCategory(category);
  }

  @Get("/id=:id")
  getById(@Param("id") id: number) {
    return this.productsService.getById(id);
  }

  @Get("/good-rated")
  async getMostSearched(@Query("skip") skip: number) {
    return this.ratingsService
      .findRatedMoreThanThree(skip)
      .then(([products, ammount]) => {
        return {
          hasMore: +skip + 5 < ammount,
          results: products,
        };
      });
  }

  @Post("/create")
  createProduct(@Body() props: ProductsDto, @Res() response: Response) {
    this.productsService
      .createProduct(props)
      .then(({ raw }) => {
        if (raw.affectedRows > 0) {
          this.notifyService
            .getTokens()
            .then((res) => res.map(({ token }) => token))
            .then((tokens) => {
              expo.sendPushNotificationsAsync(
                NewProductNotification(tokens, props.title),
              );
            });
          return response
            .status(CREATED)
            .send({ message: SUCCESS_CREATE, code: CREATED, id: raw.insertId });
        } else {
          response.status(400).send({ message: FAILED_CREATE });
        }
      })
      .catch((err) =>
        response.status(BAD).send({
          message: err.message,
          code: BAD,
        }),
      );
  }
}
