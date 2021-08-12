import { ProductsEntity } from "src/products/products.entity";

import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from "typeorm";

@Entity("cart")
export class CartEntity {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Column({ type: "int" })
  user_id: number;

  @ManyToOne(() => ProductsEntity, (prod) => prod.prod_id)
  @JoinColumn({ name: "prod_id" })
  prod_id: ProductsEntity[];
}
