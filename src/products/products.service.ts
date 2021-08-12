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
    return this.productsRepository.find({ relations: ["img_id"] });
  }

  getByCategory(category: string) {
    return this.productsRepository.find({ category });
  }
}
