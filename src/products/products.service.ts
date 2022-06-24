import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like, InsertResult, UpdateResult } from "typeorm";
import { ProductsEntity } from "./Entities/products.entity";
import { SaleEntity } from "./Entities/sale.entity";
import { SearchHistoryEntity } from "./Entities/searchHistory.entity";

const TAKE = 5;

interface ParamsProps {
  text?: string;
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,

    @InjectRepository(SearchHistoryEntity)
    private searchRepository: Repository<SearchHistoryEntity>,

    @InjectRepository(SaleEntity)
    private saleRepository: Repository<SaleEntity>,
  ) {}

  async getAllQL(skip = 0, params: ParamsProps) {
    return this.productsRepository.find({
      relations: ["img_id", "rating_id", "vendor"],
      skip,
      take: TAKE,

      ...(params.text && { where: { title: Like(`%${params.text}%`) } }),
    });
  }

  async getAll(skip: number = 0) {
    return this.productsRepository.findAndCount({
      select: ["prod_id", "price", "img_id", "title"],
      relations: ["img_id"],
      order: { prod_id: "DESC" },
      skip,
      take: TAKE,
    });
  }

  async getCategories(): Promise<string[]> {
    return this.productsRepository
      .find({
        select: ["category"],
        cache: true,
      })
      .then((response) => [...new Set(response.map(({ category }) => category))]);
  }

  async getByCategory(category: string, skip = 0) {
    return this.productsRepository.findAndCount({
      select: ["prod_id", "price", "img_id", "title"],
      where: { category },
      relations: ["img_id"],
      skip,
      take: TAKE,
    });
  }

  async getById(id: number) {
    return this.productsRepository.findOneOrFail({
      relations: ["img_id", "rating_id", "vendor"],
      where: { prod_id: id },
    });
  }

  createProduct(props: any): Promise<InsertResult> {
    return this.productsRepository.insert(props);
  }

  getByTitleOrDesc(input: string): Promise<ProductsEntity[]> {
    return this.productsRepository.find({
      select: ["prod_id", "price", "img_id", "title"],
      relations: ["img_id"],
      where: [{ title: Like(`%${input}%`) }, { description: Like(`%${input}%`) }],
    });
  }

  async pushSearchHistory(user_id: number, prod_id: any) {
    await this.searchRepository.save({ user_id, prod_id });
  }

  getSearchHistory(user_id: number): Promise<SearchHistoryEntity[]> {
    return this.searchRepository.find({
      where: { user_id },
      take: 20,
    });
  }
  async getSearchHistoryProduct(user_id: number, skip: number): Promise<any[]> {
    return this.searchRepository
      .createQueryBuilder("search")
      .leftJoinAndSelect("search.prod_id", "products")
      .leftJoinAndSelect("products.img_id", "images")
      .where("search.user_id = :user_id", { user_id })
      .take(TAKE)
      .skip(skip)
      .orderBy("search.date", "DESC")
      .getManyAndCount()
      .then(([res, ammount]) => {
        return [
          res.map(({ prod_id }: any) => ({
            prod_id: prod_id.prod_id,
            price: +prod_id.price,
            title: prod_id.title,
            img_id: prod_id.img_id,
          })),

          ammount,
        ];
      });
  }

  async getProductSuggestionsQL(text: string) {
    return this.productsRepository.find({
      select: ["prod_id", "img_id", "title", "price"],
      relations: ["img_id"],
      where: { title: Like(`%${text}%`) },
    });
  }

  async getProductSuggestions(text: string = "", params: any, skip: number = 0) {
    return this.productsRepository
      .findAndCount({
        select: ["prod_id", "img_id", "title", "price"],
        relations: ["img_id"],
        skip,
        order: {
          ...(params.title && { title: params.title }),
          ...(params.price && { price: params.price }),
        },
        where: {
          title: Like(`%${text}%`),
          ...(params.category && { category: params.category }),
          ...(params.manufacturer && { manufacturer: params.manufacturer }),
        },
        take: TAKE,
      })
      .then(([response, amount]) => {
        return [
          response.map((product) => ({
            title: product.title,
            prod_id: product.prod_id,
            image: product?.img_id[0]?.name,
            price: +product.price,
          })),
          amount,
        ];
      });
  }

  async getDailySaleProduct(): Promise<{
    hasMore: boolean;
    results: ProductsEntity;
  }> {
    return this.saleRepository
      .find({
        relations: ["prod_id", "prod_id.img_id"],
        order: {
          date: "DESC",
        },
        take: 1,
      })
      .then(([res]) => {
        if (typeof res !== "undefined") {
          return { hasMore: false, results: res.prod_id };
        }
      });
  }

  getProductsIds(): Promise<{ prod_id: number }[]> {
    return this.productsRepository.find({
      select: ["prod_id"],
    });
  }

  setDailySaleProduct(id: any): Promise<InsertResult> {
    return this.saleRepository.insert({ prod_id: id, type: "test" });
  }

  applyDiscount(prod_id: number, discount: number): Promise<UpdateResult> {
    return this.productsRepository.update({ prod_id }, { price: discount });
  }

  updateRating(prod_id: number, rating: number) {
    return this.productsRepository.update({ prod_id }, { rating });
  }

  updatePrice(prod_id: number, price: number) {
    return this.productsRepository.update({ prod_id }, { price });
  }
}
