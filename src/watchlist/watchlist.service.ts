import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { WatchlistEntity } from "./watchlist.entity";

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(WatchlistEntity)
    private watchRepository: Repository<WatchlistEntity>,
  ) {}

  getOne(watchlist_id: number) {
    return this.watchRepository.findOne({
      where: {
        id: watchlist_id,
      },
      relations: ["prod_id", "prod_id.img_id"],
    });
  }

  getWatchlist(user_id: number, skip = 0) {
    return this.watchRepository
      .createQueryBuilder("w")
      .leftJoinAndSelect("w.prod_id", "prod")
      .leftJoinAndSelect("prod.img_id", "images")
      .where("w.user_id = :user_id", { user_id })
      .take(5)
      .skip(skip)
      .getMany();
  }

  async getUsers(user_id: number, skip: number = 0) {
    return this.watchRepository
      .createQueryBuilder("w")
      .leftJoinAndSelect("w.prod_id", "prod")
      .leftJoinAndSelect("prod.img_id", "images")
      .where("w.user_id = :user_id", { user_id })
      .take(5)
      .skip(skip)
      .getManyAndCount()
      .then(([results, N]) => ({
        hasMore: skip + 5 < N,
        results: results.map(({ prod_id }) => ({
          prod_id: prod_id.prod_id,
          price: prod_id.price,
          title: prod_id.title,
          img_id: prod_id.img_id,
        })),
      }));
  }

  async addWatchlistProduct(user_id: number, prod_id: any) {
    return this.watchRepository
      .findOne({
        user_id,
        prod_id,
      })
      .then((r) => {
        if (typeof r === "undefined") return this.watchRepository.insert({ user_id, prod_id });
        return Promise.reject("Product is already in watchlist");
      });
  }

  removeWatchlistProduct(user_id: number, prod_id: any): Promise<DeleteResult> {
    return this.watchRepository.delete({
      user_id,
      prod_id,
    });
  }

  removeById(id: number) {
    return this.watchRepository.delete({ id });
  }

  checkIfProdIsIn(user_id: number, prod_id: any) {
    return this.watchRepository.findOne({ user_id, prod_id });
  }
}
