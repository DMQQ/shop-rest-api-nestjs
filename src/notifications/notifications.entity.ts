import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notifications")
export class NotificationsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "varchar" })
  token: string;
}
