import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HistoryEntity } from "./history.entity";

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,
  ) {}

  async addHistory(products: number[], { user_id, date }): Promise<string> {
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

  getHistory(id: number): Promise<any> {
    return this.historyRepository.find({
      where: { user_id: id },
      relations: ["prod_id", "img_id"],
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
