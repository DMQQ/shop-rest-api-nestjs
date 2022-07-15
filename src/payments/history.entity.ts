import { ProductsEntity } from "../products/entities/products.entity";

import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PaymentEntity } from "./payment.entity";

@ObjectType()
@Entity("purchase_history")
export class HistoryEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  history_id: number;

  @Field(() => ProductsEntity)
  @ManyToOne(() => ProductsEntity, (type) => type.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @ManyToOne(() => PaymentEntity, (t) => t.products)
  @JoinColumn({ name: "payment_id" })
  payment_id: string;
}
