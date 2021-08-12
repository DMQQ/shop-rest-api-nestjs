import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartEntity } from "./cart.entity";
import { UploadService } from "src/upload/upload.service";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    private imagesService: UploadService,
  ) {}

  async getUsersCart(user_id: number) {
    return this.cartRepository
      .find({
        relations: ["prod_id"],
        where: { user_id },
      })
      .then((result) => {
        const arr = [];
        result.forEach((object) => {
          const images = [];
          arr.push({ ...object.prod_id, img_id: images });
        });
        return arr;
      });
  }
  addToCart(user_id: number, prod_id: number): Promise<any> {
    //@ts-ignore
    return this.cartRepository.insert({ user_id, prod_id });
  }
}
