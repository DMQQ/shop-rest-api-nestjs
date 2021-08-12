import { ProductsEntity } from "src/products/products.entity";
import { UsersEntity } from "src/users/users.entity";
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

@Entity("cart")
export class CartEntity {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @OneToOne(() => ProductsEntity)
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  //
  @OneToOne(() => UsersEntity)
  @JoinColumn({ name: "user_id" })
  user_id: number;
}
