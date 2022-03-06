import { HistoryEntity } from "../payments/history.entity";
import { ProductsEntity } from "../products/Entities/products.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Field, Int, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("ratings")
export class RatingsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  rating_id: number;

  @Field(() => Int)
  @Column("int")
  user_id: number;

  @Field(() => Int)
  @Column({ type: "int" })
  rating: number;

  @Field()
  @Column({ type: "varchar" })
  title: string;

  @Field(() => ProductsEntity)
  @OneToOne(() => ProductsEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Field()
  @Column({ type: "varchar" })
  description: string;

  @Field(() => HistoryEntity)
  @OneToOne(() => HistoryEntity)
  @JoinColumn({ name: "history_id" })
  history_id: number;
}
