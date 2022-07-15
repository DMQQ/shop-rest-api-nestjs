import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import { ProductsDto } from "../dto/products.dto";
import { ProductsService } from "../services/products.service";
import { Response } from "express";
import { CREATED } from "../../utils/constants/codes";
import { FAILED_CREATE, SUCCESS_CREATE } from "../../utils/constants/responses";
import User from "../../utils/decorators/User";
import { PagingInterceptor } from "../../utils/functions/PagingInterceptor";
import { RoleGuard } from "../../utils/guards/RoleGuard";
import { UserEnum } from "../../users/users.entity";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ProductsEntity } from "../entities/products.entity";
import { OneImageInterceptor } from "../products.interceptor";
import { ParamsDto } from "../dto/ParamsDto";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOkResponse({ type: ProductsEntity })
  @UseInterceptors(OneImageInterceptor)
  @UseInterceptors(PagingInterceptor)
  async getAllProducts(@Query("skip") skip: number) {
    return this.productsService.getAll(skip);
  }

  @Get("categories")
  @ApiOkResponse({ type: [String], description: "Array of categories" })
  getCategories() {
    return this.productsService.getCategories();
  }

  @Get("search-history")
  getSearchHistory(@User() user_id: number) {
    return this.productsService.getSearchHistory(user_id);
  }

  @Get("searched-products")
  @UseInterceptors(PagingInterceptor)
  async getSearchedProducts(
    @User() user_id: number,
    @Query("skip", ParseIntPipe) skip: number = 0,
  ) {
    return this.productsService.getSearchHistoryProduct(user_id, skip);
  }

  @Get("/category")
  @UseInterceptors(OneImageInterceptor)
  @UseInterceptors(PagingInterceptor)
  getProductsByCategory(@Query("q") category: string, @Query("skip") skip: number) {
    return this.productsService.getByCategory(category, skip);
  }

  @Get("/good-rated")
  @UseInterceptors(OneImageInterceptor)
  @UseInterceptors(PagingInterceptor)
  async getMostSearched(@Query("skip", ParseIntPipe) skip: number = 0) {
    return this.productsService.getGoodRatedProducts(skip);
  }

  @UseInterceptors(PagingInterceptor)
  @Get("/search")
  async searchProducts(@Query() { q: query = "", ...params }: ParamsDto) {
    return this.productsService.getSearchedProducts(query, params, params?.skip || 0);
  }

  @Get("/:id")
  async getById(@Param("id", ParseIntPipe) id: number, @User() user_id: number) {
    try {
      const result = await this.productsService.getById(id);

      if (typeof result !== "undefined")
        this.productsService.saveSearchedProduct(user_id, result.prod_id);

      return result;
    } catch (error) {
      throw new NotFoundException(`Couldn't find product with id: ${id}`);
    }
  }

  @Post()
  @UseGuards(new RoleGuard(UserEnum.developer))
  async createProduct(
    @Body() props: ProductsDto,
    @Res() response: Response,
    @User() vendor: number,
  ) {
    const { raw } = await this.productsService.createProduct({ ...props, vendor });
    if (raw.affectedRows > 0) {
      return response.status(CREATED).send({
        message: SUCCESS_CREATE,
        StatusCode: CREATED,
        id: raw.insertId,
      });
    }
    throw new BadRequestException(FAILED_CREATE);
  }
}
