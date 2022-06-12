import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("payment")
export class PaymentEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  payment_id: string;

  @Column({ type: "varchar", length: "50", select: false })
  payment_method: string;

  @Column({ type: "varchar", select: false })
  client_secret: string;

  @Field(() => Int)
  @Column({ type: "bigint", nullable: false })
  total_price: number;
}
