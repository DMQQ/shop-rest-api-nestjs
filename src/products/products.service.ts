import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThanOrEqual, Like } from "typeorm";
import { ProductsEntity } from "./products.entity";
import { SearchHistoryEntity } from "./searchHistory.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,

    @InjectRepository(SearchHistoryEntity)
    private searchRepository: Repository<SearchHistoryEntity>,
  ) {}

  getAll() {
    return this.productsRepository.find({ relations: ["img_id", "rating_id"] });
  }

  getByCategory(category: string) {
    return this.productsRepository.find({
      where: [{ category }],
      relations: ["img_id", "rating_id"],
    });
  }

  getById(id: number) {
    return this.productsRepository.findOne({
      relations: ["img_id", "rating_id"],
      where: { prod_id: id },
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
  }: any): Promise<any> {
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
      relations: ["img_id", "rating_id"],
      where: [
        { title: Like(`%${input}%`) },
        { description: Like(`%${input}%`) },
      ],
    });
  }

  pushSearchHistory(user_id: number, word: string): Promise<any> {
    const date = new Date();
    const day = date.getDate();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const year = date.getFullYear();
    const fullTime = `${day}.${month}.${year}`;
    return this.searchRepository.insert({ user_id, word, date: fullTime });
  }

  getSearchHistory(user_id: number): Promise<SearchHistoryEntity[]> {
    return this.searchRepository.find({
      relations: ["prod_id"],
      where: [{ user_id }],
    });
  }
}
