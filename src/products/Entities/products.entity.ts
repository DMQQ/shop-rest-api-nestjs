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
} from "typeorm";

@Entity("products")
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  prod_id: number;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "decimal", nullable: true })
  discount_price: number;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar" })
  category: string;

  @OneToMany(() => UploadEntity, (img) => img.prod_id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "img_id" })
  img_id: UploadEntity[];

  @OneToMany(() => RatingsEntity, (rating) => rating.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "rating_id" })
  rating_id: RatingsEntity[];

  @ManyToOne(() => UsersEntity, (type) => type.id)
  @JoinColumn({ name: "vendor" })
  vendor: string;

  @Column({ type: "varchar", length: "60" })
  manufacturer: string;

  @Column({ type: "int", default: 0 })
  quantity: number;
}
