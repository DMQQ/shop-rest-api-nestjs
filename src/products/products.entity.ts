import { RatingsEntity } from "src/ratings/ratings.entity";
import { UploadEntity } from "src/upload/upload.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("products")
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  prod_id: number;

  @Column({ type: "decimal" })
  price: number;

  @Column({ type: "varchar" })
  expiration_date: string;

  @Column({ type: "varchar" })
  description: string;

  @Column({ type: "varchar" })
  category: string;

  @OneToMany(() => UploadEntity, (img) => img.prod_id)
  @JoinColumn({ name: "img_id" })
  img_id: UploadEntity[];

  @OneToMany(() => RatingsEntity, (rating) => rating.prod_id)
  @JoinColumn({ name: "rating_id" })
  rating_id: RatingsEntity[];
}
