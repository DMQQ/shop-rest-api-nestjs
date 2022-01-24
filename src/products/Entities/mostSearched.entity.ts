import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductsEntity } from "./products.entity";

@Entity("searches")
export class MostSearchedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductsEntity, (type) => type.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Column("int")
  searches: number;
}
