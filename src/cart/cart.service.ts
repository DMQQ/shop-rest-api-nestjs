import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, InsertResult, Repository, UpdateResult } from "typeorm";
import { CartEntity } from "./cart.entity";
import { singleCartProduct } from "./cart.functions";

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
      relations: ["prod_id", "prod_id.images"],
    });
  }

  async getOne(prod_id: any, user_id: number) {
    return this.cartRepository
      .findOne({
        relations: ["prod_id", "prod_id.images"],
        where: { prod_id, user_id },
      })
      .then(singleCartProduct);
  }

  async getCartTotal(user_id: number) {
    return this.cartRepository
      .createQueryBuilder("cart")
      .select("SUM(cart.ammount * prod.price)", "total")
      .leftJoin("cart.prod_id", "prod")
      .where("cart.user_id = :user_id", { user_id })
      .getRawOne();
  }

  async getCart(user_id: number, skip = 0) {
    return this.cartRepository
      .findAndCount({
        select: ["prod_id", "ammount", "prod_id", "cart_id"],
        relations: ["prod_id", "prod_id.images"],
        where: { user_id },
        skip,
        take: 5,
      })
      .then(([result, am]) => [result.map(singleCartProduct), am]);
  }
  addProduct(user_id: number, prod_id: any): Promise<InsertResult> {
    return this.cartRepository.insert({ user_id, prod_id });
  }

  async getTotal(user_id: number): Promise<[number, number[]]> {
    const cart = await this.cartRepository.find({
      where: { user_id },
      relations: ["prod_id"],
    });

    const total = cart.map((c: any) => c.ammount * c.prod_id!.price).reduce((a, b) => a + b);

    //@ts-ignore
    const flat = <T>(arr: T[][]): T[] => [].concat(...arr);

    const products = flat(cart.map((c: any) => new Array(c.ammount).fill(c.prod_id.prod_id)));

    return [total, products];
  }

  findSameProductInCart(user_id: number, prod_id: any): Promise<CartEntity | undefined> {
    return this.cartRepository.findOne({
      where: { user_id, prod_id },
    });
  }

  async incrementAmmount(user_id: number, prod_id: number): Promise<UpdateResult> {
    return this.cartRepository
      .createQueryBuilder("cart")
      .update()
      .set({ ammount: () => "ammount + 1" })
      .where("cart.prod_id = :prod_id", { prod_id })
      .andWhere("cart.user_id = :user_id", { user_id })
      .execute();
  }

  async decreaseAmmount(cart_id: number): Promise<UpdateResult> {
    return this.cartRepository.update({ cart_id }, { ammount: () => "ammount - 1" });
  }

  removeFromCart(cart_id: number): Promise<DeleteResult> {
    return this.cartRepository.delete({ cart_id });
  }

  findOneProductInCart(cart_id: number): Promise<CartEntity | undefined> {
    return this.cartRepository.findOne({ where: { cart_id } });
  }

  removeAllRelatedToUser(user_id: number): Promise<DeleteResult> {
    return this.cartRepository.delete({ user_id });
  }

  isInCart(user_id: number, prod_id: any) {
    return this.cartRepository.findOne({ where: { user_id, prod_id } });
  }

  removeAll(user_id: number) {
    return this.cartRepository.delete({ user_id });
  }
}
