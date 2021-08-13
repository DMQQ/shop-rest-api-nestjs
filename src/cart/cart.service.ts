import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CartEntity } from "./cart.entity";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}

  async getUsersCart(user_id: number) {
    return this.cartRepository
      .find({
        relations: ["prod_id", "img_id"],
        where: { user_id },
      })
      .then((result) => {
        const arr = [];
        result.forEach((object) => {
          arr.push({ ...object.prod_id, img_id: object.img_id });
        });
        return arr;
      });
  }
  addToCart(user_id: number, prod_id: number): Promise<any> {
    //@ts-ignore
    return this.cartRepository.insert({ user_id, prod_id });
  }
}
