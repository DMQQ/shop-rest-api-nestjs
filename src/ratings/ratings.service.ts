import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, MoreThan, Repository } from "typeorm";
import { RatingsEntity } from "./ratings.entity";
import { AddReviewProps } from "./ratings.interface";

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingsEntity)
    private ratingsRepository: Repository<RatingsEntity>,
  ) {}

  getAvg(prod_id: number) {
    return this.ratingsRepository.query("SELECT AVG(rating) FROM ratings WHERE prod_id = ?;", [
      prod_id,
    ]);
  }

  addReview(body: AddReviewProps): Promise<InsertResult> {
    return this.ratingsRepository.insert(body);
  }
  getAll() {
    return this.ratingsRepository.find();
  }

  getUsersReviews(id: number): Promise<RatingsEntity[]> {
    return this.ratingsRepository.find({
      where: { user_id: id },
    });
  }

  hasReviewed(user_id: number, prod_id: number) {
    return this.ratingsRepository.findOne({
      where: {
        user_id,
        prod_id,
      },
    });
  }

  async findRatedMoreThanThree(skip: number = 0) {
    return this.ratingsRepository
      .findAndCount({
        where: { rating: MoreThan(3) },
        relations: ["prod_id", "prod_id.img_id"],
        skip: skip,
        take: 5,
      })
      .then(([products, ammount]) => {
        return [
          products.map(({ prod_id }: any) => ({
            prod_id: prod_id.prod_id,
            price: prod_id.price,
            title: prod_id.title,
            img_id: prod_id.img_id,
          })),
          ammount,
        ];
      });
  }
}
