import { ProductsEntity } from "../products/entities/products.entity";
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

  @Field(() => Int)
  @Column({ type: "int", default: 1 })
  ammount?: number;
}

@ObjectType()
export class IsInCart {
  @Field(() => Boolean)
  isIn: boolean;
}

@ObjectType()
export class AddCart {
  @Field(() => Int)
  cart_id: number;

  @Field(() => Int, { nullable: true })
  prod_id: number;

  @Field(() => Int)
  affected: number;
}
