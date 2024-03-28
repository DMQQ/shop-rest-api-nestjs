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

  getAll(user_id: number, skip = 0) {
    return this.watchRepository
      .createQueryBuilder("w")
      .leftJoinAndSelect("w.prod_id", "prod")
      .leftJoinAndSelect("prod.img_id", "images")
      .where("w.user_id = :user_id", { user_id })
      .take(5)
      .skip(skip)
      .getMany();
  }

  async getAllREST(user_id: number, skip: number = 0) {
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

  async saveOne(user_id: number, prod_id: any) {
    return this.watchRepository.save({ user_id, prod_id });
  }

  async remove(user_id: number, prod_id: any): Promise<boolean> {
    const result = await this.watchRepository.delete({
      user_id,
      prod_id,
    });

    return result.affected > 0;
  }

  removeById(prod_id: number, user_id: number) {
    //@ts-ignore
    return this.watchRepository.delete({ prod_id, user_id });
  }

  async getOneById(prod_id: number) {
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

  isIn(user_id: number, prod_id: any) {
    return this.watchRepository.findOne({ user_id, prod_id });
  }

  getWatchlistWithNotifications(prod_id: number): Promise<
    {
      user_token: string;
      product_title: string;
    }[]
  > {
    return this.watchRepository
      .createQueryBuilder("w")
      .leftJoinAndSelect("w.user_id", "user")
      .leftJoinAndSelect("w.prod_id", "product")
      .where("w.prod_id = :prod_id", { prod_id })
      .select(["user.token", "product.title"])
      .getRawMany();
  }
}
