import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductsEntity } from "src/products/Entities/products.entity";
import { Repository } from "typeorm";
import { HistoryEntity } from "./history.entity";

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,

    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {}

  async getTotalPriceOfSelectedProducts(ids: number[]) {
    return this.productsRepository
      .findByIds(ids, {
        select: ["price"],
      })
      .then((values) => {
        return values.map(({ price }) => +price).reduce((a, b) => a + b);
      });
  }

  async addHistory(
    products: number[],
    { user_id, date }: { user_id: number; date: string },
  ): Promise<"finished" | "failed"> {
    let status = true;
    products.forEach((id) => {
      this.historyRepository
        .insert({
          user_id,
          date,
          prod_id: id,
          status: "finished",
        })
        .then(({ raw }) => {
          if (raw.affectedRows === 0) {
            status = false;
          }
        });
    });

    return status ? "finished" : "failed";
  }

  getHistory(id: number): Promise<[HistoryEntity[], number]> {
    return this.historyRepository.findAndCount({
      where: { user_id: id },
      relations: ["prod_id", "img_id"],
      order: { date: "DESC" },
    });
  }

  getUsersHistoryByProductId(
    user_id: number,
    prod_id: number,
  ): Promise<HistoryEntity[]> {
    return this.historyRepository.find({
      relations: ["prod_id"],
      where: {
        user_id,
        prod_id,
      },
    });
  }
}
