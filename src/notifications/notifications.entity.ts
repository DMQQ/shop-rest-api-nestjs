import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
@Entity("notifications")
export class NotificationsEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column("int")
  user_id: number;

  @Field()
  @Column("varchar")
  token: string;

  @Field()
  @Column("boolean", { default: false })
  enabled: boolean;
}
