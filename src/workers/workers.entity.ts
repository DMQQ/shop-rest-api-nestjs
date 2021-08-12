import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("workers")
export class WorkersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 30 })
  name: string;

  @Column({ type: "varchar", length: 30 })
  lastname: string;

  @Column({ type: "double" })
  earnings: number;

  @Column({ type: "varchar" })
  employment_date: string;
}
