import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import RemoveObjectFields from "src/functions/RemoveObjectFields";
import { Repository, MoreThanOrEqual, Like, InsertResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { ProductsEntity } from "./Entities/products.entity";
import { SearchHistoryEntity } from "./Entities/searchHistory.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,

    @InjectRepository(SearchHistoryEntity)
    private searchRepository: Repository<SearchHistoryEntity>,
  ) {}

  getAll() {
    return this.productsRepository.find({
      select: ["prod_id", "price", "img_id", "title"],
      relations: ["img_id"],
      order: { prod_id: "DESC" },
      cache: true,
    });
  }

  async getCategories(): Promise<string[]> {
    return this.productsRepository
      .find({
        select: ["category"],
      })
      .then((response) => [
        ...new Set(response.map(({ category }) => category)),
      ]);
  }

  getByCategory(category: string) {
    return this.productsRepository.find({
      select: ["prod_id", "price", "img_id", "title"],
      where: { category },
      relations: ["img_id", "rating_id"],
    });
  }

  async getById(id: number) {
    return this.productsRepository
      .findOne({
        relations: ["img_id", "rating_id", "vendor"],
        where: { prod_id: id },
      })
      .then((response) => {
        return {
          ...response,
          vendor: RemoveObjectFields(response.vendor, [
            "password",
            "user_type",
            "activated",
            "adress",
          ]),
        };
      });
  }

  async getByPriceRange(start: number, end: number): Promise<ProductsEntity[]> {
    return this.productsRepository
      .find({
        relations: ["img_id", "rating_id"],
        where: [{ price: MoreThanOrEqual(start) }],
      })
      .then((res) => {
        res.forEach((prop) => {
          if (Number(prop.price) < end) {
            return prop;
          }
        });
        return res;
      });
  }

  createProduct({
    description,
    price,
    category,
    expiration_date,
    title,
  }: any): Promise<InsertResult> {
    return this.productsRepository.insert({
      description,
      price,
      category,
      expiration_date,
      title,
    });
  }

  getByTitleOrDesc(input: string): Promise<ProductsEntity[]> {
    return this.productsRepository.find({
      select: ["prod_id", "price", "img_id", "title"],
      relations: ["img_id", "rating_id"],
      where: [
        { title: Like(`%${input}%`) },
        { description: Like(`%${input}%`) },
      ],
    });
  }

  pushSearchHistory(
    user_id: number,
    word: string,
    prod_id: QueryDeepPartialEntity<ProductsEntity[]>,
  ): Promise<InsertResult> {
    return this.searchRepository.insert({
      user_id,
      word,
      prod_id,
      date: new Date(),
    });
  }

  getSearchHistory(user_id: number): Promise<SearchHistoryEntity[]> {
    return this.searchRepository.find({
      where: { user_id },
    });
  }
  async getSearchHistoryProduct(user_id: number): Promise<any> {
    return this.searchRepository
      .find({
        relations: ["prod_id", "img_id"],
        where: [{ user_id }],
      })
      .then((res) => {
        return res.map(({ prod_id, img_id }) => ({ ...prod_id, img_id }));
      });
  }

  async getGoodRated(): Promise<ProductsEntity[]> {
    return this.productsRepository
      .find({ relations: ["img_id", "rating_id"] })
      .then((res) => {
        const output = res.filter((el) => {
          const mapedRatings = el.rating_id.map(({ rating }) => rating);
          const N = mapedRatings.length;
          const avg =
            N > 1 ? mapedRatings.reduce((a, b) => a + b) / N : mapedRatings[0];

          if (avg > 3) {
            return el;
          }
        });

        return output;
      });
  }
}
