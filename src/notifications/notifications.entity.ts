import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notifications")
export class NotificationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  user_id: number;

  @Column("varchar")
  token: string;
}
