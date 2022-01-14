import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "src/cart/cart.module";
import { NotificationsModule } from "src/notifications/notifications.module";
import { ProductsEntity } from "src/products/Entities/products.entity";
import { HistoryController } from "./history.controller";
import { HistoryEntity } from "./history.entity";
import { HistoryService } from "./history.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoryEntity, ProductsEntity]),
    CartModule,
    NotificationsModule,
  ],
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService],
})
export class HistoryModule {}
