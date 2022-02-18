import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { ProductsEntity } from "../products/Entities/products.entity";
import { UsersEntity } from "../users/users.entity";

@Entity("watchlist")
export class WatchlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductsEntity, (t) => t.prod_id)
  @JoinColumn({ name: "prod_id" })
  prod_id: ProductsEntity;

  @ManyToOne(() => UsersEntity, (t) => t.id)
  @JoinColumn({ name: "user_id" })
  user_id: number;
}
