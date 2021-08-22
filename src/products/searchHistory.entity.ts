// for later

import { UsersEntity } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductsEntity } from "./products.entity";

@Entity("search_history")
export class SearchHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (type) => type.id)
  @JoinColumn({ name: "user_id" })
  user_id: number;

  @Column("varchar")
  word: string;

  @Column("varchar")
  date: string;

  /*  @OneToMany(() => ProductsEntity, (type) => type.prod_id)
  @JoinColumn({ name: "prod_id" })
  prod_id: ProductsEntity[]; */
}
