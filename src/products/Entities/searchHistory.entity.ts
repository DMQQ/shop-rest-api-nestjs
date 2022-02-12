import { UploadEntity } from "../../upload/upload.entity";
import { UsersEntity } from "../../users/users.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { ProductsEntity } from "./products.entity";

@Entity("search_history")
export class SearchHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  user_id: number;

  @ManyToOne(() => ProductsEntity, (type) => type.prod_id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "prod_id" })
  prod_id: any;

  @UpdateDateColumn({ name: "date", insert: true, type: "timestamp" })
  date: string;
}
