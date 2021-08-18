import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThanOrEqual, Like } from "typeorm";
import { ProductsEntity } from "./products.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
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
    return this.productsRepository.save({
      description,
      price,
      category,
      expiration_date,
      title,
    });
  }

  getByTitleOrDesc(input: string) {
    return this.productsRepository.find({
      relations: ["img_id", "rating_id"],
      where: [
        { title: Like(`%${input}%`) },
        { description: Like(`%${input}%`) },
      ],
    });
  }
}
