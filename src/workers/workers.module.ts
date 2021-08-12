import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkersEntity } from "./workers.entity";

@Module({
  imports: [TypeOrmModule.forFeature([WorkersEntity])],
  providers: [],
})
export class WorkersModule {}
