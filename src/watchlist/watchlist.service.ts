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

  async getWatchlistREST(user_id: number, skip: number = 0) {
    return this.watchRepository
      .createQueryBuilder("w")
      .leftJoinAndSelect("w.prod_id", "prod")
      .leftJoinAndSelect("prod.img_id", "images")
      .where("w.user_id = :user_id", { user_id })
      .take(5)
      .skip(skip)
      .getManyAndCount()
      .then(([watchlist, am]) => [
        watchlist.map(({ prod_id }) => ({
          prod_id: prod_id.prod_id,
          price: prod_id.price,
          title: prod_id.title,
          img_id: prod_id.img_id,
        })),
        am,
      ]);
  }

  async save(user_id: number, prod_id: any) {
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

  remove(user_id: number, prod_id: any): Promise<DeleteResult> {
    return this.watchRepository.delete({
      user_id,
      prod_id,
    });
  }

  removeById(prod_id: number, user_id: number) {
    //@ts-ignore
    return this.watchRepository.delete({ prod_id, user_id });
  }

  getWatchlistProductById(prod_id: number) {
    return this.watchRepository
      .createQueryBuilder("w")
      .leftJoinAndSelect("w.prod_id", "product")
      .leftJoinAndSelect("product.img_id", "images")
      .where("w.prod_id = :prod_id", { prod_id })
      .getOne()
      .then(({ prod_id: { title, price, prod_id, img_id } }) => ({
        title,
        price,
        prod_id,
        img_id: [img_id?.[0]],
      }));
  }

  checkIfProdIsIn(user_id: number, prod_id: any) {
    return this.watchRepository.findOne({ user_id, prod_id });
  }
}
