import { Body, Controller, Get, Param, Post, Req, Res } from "@nestjs/common";
import { ProductsDto } from "./dto/products.dto";
import { ProductsService } from "./products.service";
import { Response } from "express";
import { BAD, CREATED, OK } from "src/constants/codes";
import { FAILED_CREATE, SUCCESS_CREATE } from "src/constants/responses";
import { NotificationsService } from "src/notifications/notifications.service";
import { expo, NewProductNotification } from "src/notifications/methods";
import { RequestExtend } from "src/@types/types";

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

  @Get("searched=:text")
  async getBySearchTitleOrDescription(
    @Param("text") text: string,
    @Req() { user_id }: RequestExtend,
    @Res() response: Response,
  ) {
    return this.productsService.getByTitleOrDesc(text).then((result) => {
      if (typeof result !== "undefined") {
        const [one] = result;
        this.productsService.pushSearchHistory(user_id, text, one.prod_id);
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
  getSearchedProducts(@Req() { user_id }: RequestExtend) {
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

  @Post("/create")
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
