import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
    return this.productsRepository.find({ category });
  }

  getById(id: number) {
    return this.productsRepository.findOne({
      relations: ["img_id", "rating_id"],
      where: { prod_id: id },
    });
  }

  createProduct({
    description,
    price,
    category,
    expiration_date,
  }: any): Promise<any> {
    return this.productsRepository.save({
      description,
      price,
      category,
      expiration_date,
    });
  }
}
