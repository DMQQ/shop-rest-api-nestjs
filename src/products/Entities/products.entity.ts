import { RatingsEntity } from "../../ratings/ratings.entity";
import { UploadEntity } from "../../upload/upload.entity";
import { UsersEntity } from "../../users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Field, Int, Float, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("products")
export class ProductsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  prod_id: number;

  @Field(() => Float)
  @Column({ type: "decimal" })
  price: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: "decimal", nullable: true })
  discount_price: number;

  @Field()
  @Column({ type: "varchar" })
  title: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field()
  @Column({ type: "varchar" })
  category: string;

  @Field(() => [UploadEntity], { defaultValue: [] })
  @OneToMany(() => UploadEntity, (img) => img.prod_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "img_id" })
  img_id: UploadEntity[];

  @Field(() => [RatingsEntity], { defaultValue: [] })
  @OneToMany(() => RatingsEntity, (rating) => rating.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "rating_id" })
  rating_id: RatingsEntity[];

  @Field(() => UsersEntity)
  @ManyToOne(() => UsersEntity, (type) => type.id)
  @JoinColumn({ name: "vendor" })
  vendor: string;

  @Field()
  @Column({ type: "varchar", length: "60" })
  manufacturer: string;

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
  quantity: number;

  @Field()
  @UpdateDateColumn({ insert: true, name: "date_add" })
  date_add: Date;

  @Column({ type: "varchar" })
  tags: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @Column({ type: "int", default: 0 })
  rating: number;
}
