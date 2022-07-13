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

  getUsersReviews(user_id: number, skip: number = 0): Promise<RatingsEntity[]> {
    return this.ratingsRepository.find({
      where: { user_id },
      skip,
      take: 5,
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
}
