import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "src/cart/cart.module";
import { HistoryController } from "./history.controller";
import { HistoryEntity } from "./history.entity";
import { HistoryService } from "./history.service";

@Module({
  imports: [TypeOrmModule.forFeature([HistoryEntity]), CartModule],
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService],
})
export class HistoryModule {}
