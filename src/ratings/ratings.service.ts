import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RatingsEntity } from "./ratings.entity";

interface IAddReviewProps {
  rating: number;
  title: string;
  description: string;
  user_id: number;
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
}
