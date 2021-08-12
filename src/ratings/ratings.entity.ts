import { HistoryEntity } from "src/history/history.entity";
import { ProductsEntity } from "src/products/products.entity";
import { UsersEntity } from "src/users/users.entity";
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

  @OneToOne(() => UsersEntity)
  @JoinColumn({ name: "user_id" })
  user_id: number;

  @Column({ type: "int" })
  rating: number;

  @Column({ type: "varchar" })
  title: string;

  @OneToOne(() => ProductsEntity)
  @JoinColumn({ name: "prod_id" })
  prod_id: number;

  @Column({ type: "varchar" })
  description: string;

  @OneToOne(() => HistoryEntity)
  @JoinColumn({ name: "history_id" })
  history_id: number;
}
