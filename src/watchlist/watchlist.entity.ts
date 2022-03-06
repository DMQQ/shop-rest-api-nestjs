import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ProductsEntity } from "../products/Entities/products.entity";
import { UsersEntity } from "../users/users.entity";

import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("watchlist")
export class WatchlistEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => ProductsEntity)
  @ManyToOne(() => ProductsEntity, (t) => t.prod_id)
  @JoinColumn({ name: "prod_id" })
  prod_id: ProductsEntity;

  @Field(() => Int)
  @ManyToOne(() => UsersEntity, (t) => t.id)
  @JoinColumn({ name: "user_id" })
  user_id: number;
}
