import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { ProductsEntity } from "../products/entities/products.entity";
import { UsersEntity } from "../users/users.entity";

@ObjectType()
class Creator {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}

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

  @ManyToOne(() => ProductsEntity, (type) => type.prod_id)
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Field()
  @Column({ type: "varchar" })
  description: string;

  @Field(() => Boolean)
  @Column({ type: "boolean" })
  isVerified: boolean;

  @Field(() => Boolean)
  @Column({ type: "boolean" })
  isConfirmedPurchase: boolean;

  @Field(() => String)
  @CreateDateColumn({ name: "created_at" })
  created_at: string;

  @Field(() => Creator, { nullable: true })
  @ManyToOne(() => UsersEntity, (type) => type.id)
  @JoinColumn({ name: "user_id" })
  creator: Creator;
}

@InputType()
export class CreateRatingsInput {
  @Field(() => Int)
  @Column({ type: "int" })
  rating: number;

  @Field()
  @Column({ type: "varchar" })
  title: string;

  @Field()
  @Column({ type: "varchar" })
  description: string;

  @Field(() => Int)
  @Column({ type: "int" })
  prod_id: number;
}
