import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { RatingsEntity } from "./ratings.entity";

interface IAddReviewProps {
  rating: number;
  title: string;
  description: string;
  user_id: number;
  history_id: number;
  prod_id: number;
}

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(RatingsEntity)
    private ratingsRepository: Repository<RatingsEntity>,
  ) {}

  addReview(body: IAddReviewProps): Promise<any> {
    return this.ratingsRepository.insert(body);
  }
  getAll() {
    return this.ratingsRepository.find();
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
        return [products.map(({ prod_id }) => prod_id), ammount];
      });
  }
}
