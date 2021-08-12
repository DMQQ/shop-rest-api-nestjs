import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HistoryEntity } from "./history.entity";

interface IHistory {
  user_id: number;
  prod_id: number;
  date: string;
  status: string;
}

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,
  ) {}

  addHistory(body: IHistory): Promise<any> {
    return this.historyRepository.insert(body);
  }

  getHistory(id: number) {
    return this.historyRepository.find({ user_id: id });
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
