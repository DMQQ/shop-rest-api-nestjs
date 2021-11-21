// for later

import { UploadEntity } from "src/upload/upload.entity";
import { UsersEntity } from "src/users/users.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
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

  @ManyToOne(() => ProductsEntity, (type) => type.prod_id)
  @JoinColumn({ name: "prod_id" })
  prod_id: QueryDeepPartialEntity<ProductsEntity[]>;

  @OneToMany(() => UploadEntity, (type) => type.prod_id)
  @JoinColumn({ name: "img_id" })
  img_id: number;
}
