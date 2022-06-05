import { ProductsEntity } from "../products/Entities/products.entity";

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
} from "typeorm";

import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PaymentEntity } from "./payment.entity";

enum PaymentSteps {
  created = "created",
  processing = "processing",
  finished = "finished",
  failed = "failed",
}

@ObjectType()
@Entity("purchase_history")
export class HistoryEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  history_id: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { select: false })
  user_id: number;

  @Field(() => ProductsEntity)
  @ManyToOne(() => ProductsEntity, (type) => type.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Field(() => String)
  @CreateDateColumn({ insert: true, type: "timestamp" })
  date: string;

  @Field({ nullable: true })
  @Column({ type: "enum", enum: PaymentSteps, nullable: true, select: false })
  status: string;

  @Field(() => PaymentEntity, { nullable: true })
  @OneToOne(() => PaymentEntity, (type) => type.history_id)
  @JoinColumn({ name: "payment" })
  payment: PaymentEntity;
}
