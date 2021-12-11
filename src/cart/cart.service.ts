import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
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
  addToCart(user_id: number, prod_id: any): Promise<InsertResult> {
    return this.cartRepository.insert({ user_id, prod_id });
  }

  findSameProductInCart(user_id: number, prod_id: any): Promise<CartEntity> {
    return this.cartRepository.findOne({ user_id, prod_id });
  }

  async incrementAmmount(
    user_id: number,
    prod_id: number,
  ): Promise<UpdateResult> {
    return this.findSameProductInCart(user_id, prod_id).then(
      ({ cart_id, ammount }) => {
        return this.cartRepository.update(
          { cart_id: cart_id },
          { ammount: ammount + 1 },
        );
      },
    );
  }

  async decreaseAmmount(
    cart_id: number,
    ammount: number,
  ): Promise<UpdateResult> {
    return this.cartRepository.update({ cart_id }, { ammount: ammount - 1 });
  }

  removeFromCart(cart_id: number): Promise<DeleteResult> {
    //@ts-ignore
    return this.cartRepository.delete({ cart_id });
  }

  findOneProductInCart(cart_id: number): Promise<CartEntity> {
    return this.cartRepository.findOne({ cart_id });
  }

  removeAllRelatedToUser(user_id: number): Promise<DeleteResult> {
    return this.cartRepository.delete({ user_id });
  }

  countUserProductsInCart(user_id: number): Promise<number> {
    return this.cartRepository.count({ user_id });
  }
}
