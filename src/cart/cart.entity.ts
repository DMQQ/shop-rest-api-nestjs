import { ProductsEntity } from "../products/Entities/products.entity";
import { UploadEntity } from "../upload/upload.entity";

import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Column,
  OneToMany,
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

  @OneToMany(() => UploadEntity, (type) => type.prod_id)
  @JoinColumn({ name: "img_id" })
  img_id: number;

  @Column({ type: "int", default: 1 })
  ammount?: number;
}
