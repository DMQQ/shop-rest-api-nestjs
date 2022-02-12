import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

enum UserEnum {
  user = "user",
  seller = "seller",
  developer = "developer",
}

@Entity("users")
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  email: string;

  @Column({ type: "varchar", length: 60, select: false })
  password: string;

  @Column({ type: "enum", default: UserEnum.user, enum: UserEnum, select: false })
  user_type: UserEnum;

  @Column({ type: "boolean", default: false, select: false })
  activated: boolean;

  @Column({ type: "varchar", nullable: true, length: "60" })
  name: string;

  @Column({ type: "varchar", nullable: true, length: "60" })
  surname: string;

  @Column({ type: "varchar", nullable: true, length: "60", select: false })
  address: string;

  @Column({ type: "varchar", length: "9", nullable: true, select: false })
  phone_number: string;

  @CreateDateColumn()
  @Column({ name: "joined_at", insert: true })
  joined_at: Date;

  @CreateDateColumn()
  last_active: Date;
}
