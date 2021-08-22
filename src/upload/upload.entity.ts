import { ProductsEntity } from "../products/Entities/products.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("images")
export class UploadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductsEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Column({ type: "varchar" })
  name: string;
}
