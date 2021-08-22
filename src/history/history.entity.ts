import { ProductsEntity } from "../products/Entities/products.entity";
import { UsersEntity } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("purchase_history")
export class HistoryEntity {
  @PrimaryGeneratedColumn()
  history_id: number;

  @OneToOne(() => UsersEntity)
  @JoinColumn({ name: "user_id" })
  user_id: number;

  @OneToOne(() => ProductsEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Column({ type: "varchar", length: 10 })
  date: string;

  @Column({ type: "varchar", length: 10 })
  status: string;
}
