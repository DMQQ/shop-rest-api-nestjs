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
import { ApiProperty } from "@nestjs/swagger";

@ObjectType()
@Entity("products")
export class ProductsEntity {
  @ApiProperty()
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  prod_id: number;

  @ApiProperty()
  @Field(() => Float)
  @Column({ type: "decimal" })
  price: number;

  @ApiProperty()
  @Field(() => Float, { nullable: true })
  @Column({ type: "decimal", nullable: true })
  discount_price: number;

  @ApiProperty()
  @Field()
  @Column({ type: "varchar" })
  title: string;

  @ApiProperty()
  @Field()
  @Column({ type: "text" })
  description: string;

  @ApiProperty()
  @Field()
  @Column({ type: "varchar" })
  category: string;

  @ApiProperty({ description: "Product's images", default: [] })
  @Field(() => [UploadEntity], { defaultValue: [] })
  @OneToMany(() => UploadEntity, (img) => img.prod_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "img_id" })
  img_id: UploadEntity[];

  @ApiProperty({ description: "Product's ratings", default: [] })
  @Field(() => [RatingsEntity], { defaultValue: [] })
  @OneToMany(() => RatingsEntity, (rating) => rating.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "rating_id" })
  rating_id: RatingsEntity[];

  @ApiProperty({ description: "Seller of the product" })
  @Field(() => UsersEntity)
  @ManyToOne(() => UsersEntity, (type) => type.id)
  @JoinColumn({ name: "vendor" })
  vendor: string;

  @Field()
  @Column({ type: "varchar", length: "60" })
  manufacturer: string;

  @ApiProperty({ description: "Product's left" })
  @Field(() => Int)
  @Column({ type: "int", default: 0 })
  quantity: number;

  @ApiProperty()
  @Field()
  @UpdateDateColumn({ insert: true, name: "date_add" })
  date_add: Date;

  @Column({ type: "varchar" })
  tags: string;

  @ApiProperty({ minimum: 0, maximum: 5, description: "Product's rating", default: 0 })
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @Column({ type: "int", default: 0 })
  rating: number;
}
