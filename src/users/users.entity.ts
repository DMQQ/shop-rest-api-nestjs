import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";

enum UserEnum {
  user = "user",
  seller = "seller",
  developer = "developer",
}

@ObjectType()
@Entity("users")
export class UsersEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "varchar", length: 30 })
  email: string;

  @Column({ type: "varchar", length: 60, select: false })
  password: string;

  @Field()
  @Column({ type: "enum", default: UserEnum.user, enum: UserEnum, select: false })
  user_type: UserEnum;

  @Field()
  @Column({ type: "boolean", default: false, select: false })
  activated: boolean;

  @Field()
  @Column({ type: "varchar", nullable: true, length: "60" })
  name: string;

  @Field()
  @Column({ type: "varchar", nullable: true, length: "60" })
  surname: string;

  @Field()
  @Column({ type: "varchar", nullable: true, length: "60", select: false })
  address: string;

  @Field()
  @Column({ type: "varchar", length: "9", nullable: true, select: false })
  phone_number: string;

  @CreateDateColumn()
  @Column({ name: "joined_at", insert: true })
  joined_at: Date;

  @CreateDateColumn()
  last_active: Date;
}
