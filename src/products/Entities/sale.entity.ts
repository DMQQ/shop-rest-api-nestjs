import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductsEntity } from "./products.entity";

import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
@Entity("daily_promotion")
export class SaleEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ name: "date", nullable: false, insert: true })
  date: Date;

  @Column({ type: "int" })
  amount: number;

  @Field(() => ProductsEntity)
  @ManyToOne(() => ProductsEntity, (type) => type.prod_id)
  @JoinColumn({ name: "prod_id" })
  prod_id: ProductsEntity;

  @Field()
  @Column({ type: "varchar" })
  type: string;
}
