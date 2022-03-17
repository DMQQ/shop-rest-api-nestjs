import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductsEntity } from "./products.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
@Entity("searches")
export class MostSearchedEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @ManyToOne(() => ProductsEntity, (type) => type.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Field(() => Int)
  @Column("int")
  searches: number;
}
