import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SaleEntity } from "../entities/sale.entity";

@Injectable()
export class SaleService {
  constructor(@InjectRepository(SaleEntity) private saleRepository: Repository<SaleEntity>) {}

  async setDailySaleProduct(id: any, amount: number) {
    // const quantity = await this.productsRepository.findOne({ prod_id: id });

    return this.saleRepository.insert({ prod_id: id, type: "test", amount });
  }

  async getDailySaleProduct() {
    return this.saleRepository
      .find({
        relations: ["prod_id", "prod_id.images"],
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

  async getDailySale() {
    return this.saleRepository
      .createQueryBuilder("sale")
      .leftJoinAndSelect("sale.prod_id", "product")
      .leftJoinAndSelect("product.images", "image")
      .leftJoinAndSelect("product.ratings", "ratings")
      .leftJoinAndSelect("ratings.creator", "creator")
      .select([
        "sale.date",
        "product.prod_id",
        "product.title",
        "product.price",
        "image.id",
        "image.name",
        "sale.amount",
        "product.rating",
        "ratings",
        "creator.name",
        "creator.email",
        "creator.id",
      ])
      .orderBy("sale.date", "DESC")
      .getOne()
      .then(({ prod_id, ...rest }) => ({
        ...rest,
        ...prod_id,
        quantity: rest.amount,
        reviewsCount: prod_id.ratings.length,
      }));
  }
}
