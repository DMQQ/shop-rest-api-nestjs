import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HistoryEntity } from "./history.entity";

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity])],
})
export class HistoryModule {}
