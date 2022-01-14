import { ProductsEntity } from "../products/Entities/products.entity";
import { UploadEntity } from "src/upload/upload.entity";

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";

@Entity("purchase_history")
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  history_id: number;

  @Column("int")
  user_id: number;

  @ManyToOne(() => ProductsEntity, (type) => type.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Column({ type: "varchar", length: 10 })
  date: string;

  @Column({ type: "varchar", length: 10 })
  status: string;

  @OneToMany(() => UploadEntity, (type) => type.prod_id)
  @JoinColumn({ name: "img_id" })
  img_id: number;
}
