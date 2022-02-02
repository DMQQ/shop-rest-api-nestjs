import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "../cart/cart.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { ProductsEntity } from "../products/Entities/products.entity";
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
