import { ProductsEntity } from "../products/Entities/products.entity";
import { UploadEntity } from "../upload/upload.entity";

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("purchase_history")
export class HistoryEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  history_id: number;

  @Field(() => Int)
  @Column("int")
  user_id: number;

  @Field(() => Int)
  @ManyToOne(() => ProductsEntity, (type) => type.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Field()
  @Column({ type: "varchar", length: 10 })
  date: string;

  @Field()
  @Column({ type: "varchar", length: 10 })
  status: string;

  @Field(() => Int)
  @OneToMany(() => UploadEntity, (type) => type.prod_id)
  @JoinColumn({ name: "img_id" })
  img_id: number;
}

@ObjectType()
class Details {
  @Field(() => Int)
  purchase_id: number;

  @Field(() => String)
  date: string;

  @Field(() => String)
  status: string;
}

@ObjectType()
export class HistoryResponse {
  @Field(() => ProductsEntity)
  product: ProductsEntity;

  @Field(() => Details)
  details: Details;
}
