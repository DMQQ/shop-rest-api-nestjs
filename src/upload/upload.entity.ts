import { ProductsEntity } from "../products/Entities/products.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("images")
export class UploadEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @ManyToOne(() => ProductsEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Field()
  @Column({ type: "varchar" })
  name: string;
}
