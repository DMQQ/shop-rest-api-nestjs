import { HistoryEntity } from "src/history/history.entity";
import { ProductsEntity } from "../products/Entities/products.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("ratings")
export class RatingsEntity {
  @PrimaryGeneratedColumn()
  rating_id: number;

  @Column("int")
  user_id: number;

  @Column({ type: "int" })
  rating: number;

  @Column({ type: "varchar" })
  title: string;

  @OneToOne(() => ProductsEntity, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Column({ type: "varchar" })
  description: string;

  @OneToOne(() => HistoryEntity)
  @JoinColumn({ name: "history_id" })
  history_id: number;
}
