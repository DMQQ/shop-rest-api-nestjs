import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  Repository,
  Like,
  InsertResult,
  UpdateResult,
  MoreThan,
  Between,
  MoreThanOrEqual,
} from "typeorm";
import { ProductsEntity } from "../entities/products.entity";
import { SaleEntity } from "../entities/sale.entity";
import { SearchHistoryEntity } from "../entities/searchHistory.entity";
import { ParamsDto } from "../dto/ParamsDto";

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
  ) {}

  async getAllQL(skip = 0, params: ParamsProps) {
    return this.productsRepository.find({
      relations: ["img_id", "rating_id", "vendor"],
      skip,
      take: TAKE,

      ...(params.text && { where: { title: Like(`%${params.text}%`) } }),
    });
  }

  getAll(skip: number = 0) {
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

  async updateProduct(prod_id: number, props: any) {
    return this.productsRepository.update({ prod_id }, props);
  }

  async saveSearchedProduct(user_id: number, prod_id: any) {
    await this.searchRepository.save({ user_id, prod_id });
  }

  getSearchHistory(user_id: number): Promise<SearchHistoryEntity[]> {
    return this.searchRepository.find({
      where: { user_id },
      take: 20,
    });
  }
  async getSearchHistoryProduct(user_id: number, skip: number) {
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
            img_id: [prod_id.img_id?.[0]],
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

  async getSearchedProducts(props: ParamsDto) {
    return this.productsRepository
      .findAndCount({
        select: ["prod_id", "img_id", "title", "price"],
        relations: ["img_id"],
        skip: +props.skip || 0,
        take: +props.take || TAKE,

        order: {
          price: props.order === "price" ? "ASC" : "DESC",
          title: props.order === "title" ? "ASC" : "DESC",
        },
        where: {
          ...(props.category && { category: props.category }),
          ...((props.minPrice || props.maxPrice) && {
            price: Between(+props.minPrice || 0, +props.maxPrice || 100000),
          }),

          ...(props.q && { title: Like(`%${props.q}%`) }),
          ...(props.vendor && { vendor: props.vendor }),
          ...(props.rating && { rating: MoreThanOrEqual(+props.rating) }),
          ...(props.description && { description: Like(`%${props.description}%`) }),
          ...(props.manufactor && { manufacturer: Like(`%${props.manufactor}%`) }),
        },
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

  getProductsIds(): Promise<{ prod_id: number }[]> {
    return this.productsRepository.find({
      select: ["prod_id"],
    });
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

  getGoodRatedProducts(skip: number) {
    return this.productsRepository.findAndCount({
      select: ["price", "prod_id", "title", "img_id"],
      relations: ["img_id"],
      where: {
        rating: MoreThan(3),
      },
      skip,
      take: TAKE,
    });
  }
}
