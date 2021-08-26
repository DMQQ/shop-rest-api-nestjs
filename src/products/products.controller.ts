import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { ProductsDto } from "./dto/products.dto";
import { ProductsService } from "./products.service";
import { Response } from "express";
import { BAD, CREATED, OK } from "src/constants/codes";
import { FAILED_CREATE, SUCCESS_CREATE } from "src/constants/responses";
import { NotificationsService } from "src/notifications/notifications.service";
import { expo, NewProductNotification } from "src/notifications/methods";

@Controller("products")
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private notifyService: NotificationsService,
  ) {}

  @Get()
  getAllProducts() {
    return this.productsService.getAll();
  }

  @Get("/price=:low&:high")
  async getProductsByPriceRange(
    @Param("low") low: number,
    @Param("high") high: number,
  ) {
    return this.productsService.getByPriceRange(low, high);
  }

  @Get("searched=:text")
  async getBySearchTitleOrDescription(
    @Param("text") text: string,
    @Req() req: any,
    @Res() response: Response,
  ) {
    const { user_id } = req;

    return this.productsService.getByTitleOrDesc(text).then((result) => {
      if (result.length > 0) {
        this.productsService.pushSearchHistory(
          user_id,
          text,
          result[0]?.prod_id,
        );

        return response.status(OK).send(result);
      }
      response.status(OK).send([]);
    });
  }

  @Get("search-history")
  getSearchHistory(@Req() req: any) {
    const { user_id } = req;
    return this.productsService.getSearchHistory(user_id);
  }

  @Get("searched-products")
  getSearchedProducts(@Req() req: any) {
    const { user_id } = req;

    return this.productsService.getSearchHistoryProduct(user_id);
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
  getMostSearched() {
    return this.productsService.getGoodRated();
  }

  @Post("create/product")
  createProduct(@Body() props: ProductsDto, @Res() response: Response) {
    this.productsService
      .createProduct(props)
      .then(({ raw }) => {
        if (raw.affectedRows > 0) {
          this.notifyService
            .getTokens()
            .then((res) => {
              return res.map(({ token }) => token);
            })
            .then((tokens) => {
              expo.sendPushNotificationsAsync(
                NewProductNotification(tokens, props.title),
              );
            });
          return response
            .status(CREATED)
            .send({ message: SUCCESS_CREATE, code: CREATED });
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
