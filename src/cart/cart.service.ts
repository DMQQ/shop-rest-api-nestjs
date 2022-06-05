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

  getUsersCartQL(user_id: number) {
    return this.cartRepository.find({
      where: {
        user_id,
      },
      relations: ["prod_id", "prod_id.img_id"],
    });
  }

  async getSingleCartProduct(prod_id: number, user_id: number) {
    return this.cartRepository
      .findOne({
        relations: ["prod_id", "prod_id.img_id"],
        where: { prod_id, user_id },
      })
      .then((result: any) => ({
        prod_id: result.prod_id.prod_id,
        cart_id: result.cart_id,
        ammount: result.ammount,
        title: result.prod_id.title,
        price: result.prod_id.price,
        img_id: [result.prod_id.img_id[0]],
      }));
  }

  async getUsersCart(user_id: number, skip = 0) {
    return this.cartRepository
      .find({
        select: ["prod_id", "ammount", "prod_id", "cart_id"],
        relations: ["prod_id", "img_id"],
        where: { user_id },
        skip,
        take: 5,
      })
      .then((result) =>
        result.map(({ prod_id, img_id, cart_id, ammount }: any) => ({
          prod_id: prod_id.prod_id,
          price: prod_id.price,
          title: prod_id.title,
          img_id: [img_id[0]],
          cart_id,
          ammount,
        })),
      );
  }
  addToCart(user_id: number, prod_id: any): Promise<InsertResult> {
    return this.cartRepository.insert({ user_id, prod_id });
  }

  findSameProductInCart(user_id: number, prod_id: any): Promise<CartEntity> {
    return this.cartRepository.findOne({ user_id, prod_id });
  }

  async incrementAmmount(user_id: number, prod_id: number): Promise<UpdateResult> {
    return this.findSameProductInCart(user_id, prod_id).then(({ cart_id, ammount }) => {
      return this.cartRepository.update({ cart_id: cart_id }, { ammount: ammount + 1 });
    });
  }

  async decreaseAmmount(cart_id: number, ammount: number): Promise<UpdateResult> {
    return this.cartRepository.update({ cart_id }, { ammount: ammount - 1 });
  }

  removeFromCart(cart_id: number): Promise<DeleteResult> {
    return this.cartRepository.delete({ cart_id });
  }

  findOneProductInCart(cart_id: number): Promise<CartEntity> {
    return this.cartRepository.findOne({ cart_id });
  }

  removeAllRelatedToUser(user_id: number): Promise<DeleteResult> {
    return this.cartRepository.delete({ user_id });
  }

  getOneByUserAndProduct(user_id: number, prod_id: any) {
    return this.cartRepository.findOne({ user_id, prod_id });
  }
}
