import { ProductsEntity } from "../products/Entities/products.entity";
import { UploadEntity } from "../upload/upload.entity";

import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column, OneToMany } from "typeorm";

import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
@Entity("cart")
export class CartEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Field(() => Int)
  @Column({ type: "int" })
  user_id: number;

  @Field(() => ProductsEntity, { nullable: false })
  @ManyToOne(() => ProductsEntity, (prod) => prod.prod_id)
  @JoinColumn({ name: "prod_id" })
  prod_id: ProductsEntity[];

  @Field(() => [UploadEntity])
  @OneToMany(() => UploadEntity, (type) => type.prod_id)
  @JoinColumn({ name: "img_id" })
  img_id: number;

  @Field(() => Int)
  @Column({ type: "int", default: 1 })
  ammount?: number;
}
