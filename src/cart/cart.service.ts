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
          arr.push({
            ...object.prod_id,
            img_id: object.img_id,
            cart_id: object.cart_id,
            ammount: object.ammount,
          });
        });
        return arr;
      });
  }
  addToCart(user_id: number, prod_id: number): Promise<any> {
    //@ts-ignore
    return this.cartRepository.insert({ user_id, prod_id });
  }

  findSameProductInCart(user_id: number, prod_id: number): Promise<CartEntity> {
    //@ts-ignore
    return this.cartRepository.findOne({ user_id, prod_id });
  }

  async incrementAmmount(user_id: number, prod_id: number) {
    return this.findSameProductInCart(user_id, prod_id).then((res) => {
      return this.cartRepository.update(
        { cart_id: res.cart_id },
        { ammount: res.ammount + 1 },
      );
    });
  }

  async decreaseAmmount(cart_id: number, ammount: number) {
    return this.cartRepository.update({ cart_id }, { ammount: ammount - 1 });
  }

  removeFromCart(cart_id: number) {
    //@ts-ignore
    return this.cartRepository.delete({ cart_id });
  }

  findOneProductInCart(cart_id: number): Promise<CartEntity> {
    return this.cartRepository.findOne({ cart_id });
  }
}
