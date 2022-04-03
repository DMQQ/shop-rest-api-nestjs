import { Field, ID, InputType, Int, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { ProductsEntity } from "../products/Entities/products.entity";
import { UsersEntity } from "../users/users.entity";

@ObjectType()
@Entity("auction")
export class Auction {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  readonly auction_id: string;

  @Field(() => Int)
  @Column({ type: "int", nullable: false })
  seller: number;

  @Field(() => String)
  @CreateDateColumn({ insert: true, type: "datetime" })
  date_start: Date;

  @Field(() => String)
  @Column({ type: "varchar", nullable: false })
  date_end: Date;

  @Field(() => Boolean, { nullable: false })
  @Column({ type: "boolean" })
  active: boolean;

  @Field(() => ProductsEntity, { nullable: false })
  @ManyToOne(() => ProductsEntity, (type) => type.prod_id, { nullable: false })
  @JoinColumn({ name: "product" })
  product: ProductsEntity[];

  @Field(() => [Bids], { nullable: false, defaultValue: [] })
  @ManyToMany(() => Bids, (type) => type.auction_id, { onDelete: "CASCADE" })
  @JoinTable({
    joinColumn: {
      name: "auction_id",
      referencedColumnName: "auction_id",
    },
    inverseJoinColumn: {
      name: "bid_id",
      referencedColumnName: "bid_id",
    },
  })
  bids: Bids[];
}

@ObjectType()
@Entity("bids")
export class Bids {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  bid_id: string;

  @Field(() => Int)
  @Column({ type: "int" })
  user: number;

  @Field(() => Int)
  @Column({ type: "bigint", nullable: false })
  amount: number;

  @Field(() => String)
  @CreateDateColumn({ insert: true })
  date_add: Date;

  @Field(() => String)
  @Column({ type: "varchar", nullable: false })
  auction_id: string;
}

@InputType()
export class AuctionCreate {
  @Field(() => Boolean)
  active: boolean;

  @Field(() => String)
  date_end: string;

  @Field(() => Int)
  product: number;
}

@ObjectType()
export class AuctionCreateResponse {
  @Field(() => String)
  auction_id: string;

  @Field(() => String)
  date_start: Date;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String)
  date_end: string;

  @Field(() => Int)
  product: number;
}

@ObjectType()
export class BidCreateResponse {
  @Field(() => String)
  auction_id: string;

  @Field(() => ID)
  bid_id: string;

  @Field(() => Int)
  amount: number;
}

@InputType()
export class BidCreate {
  @Field(() => ID)
  auction_id: string;

  @Field(() => Int)
  amount: number;
}
