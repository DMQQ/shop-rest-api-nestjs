import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "../cart/cart.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { HistoryController } from "./history.controller";
import { HistoryEntity } from "./history.entity";
import { HistoryResolver } from "./history.resolver";
import { HistoryService } from "./history.service";
import { PaymentEntity } from "./payment.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([HistoryEntity, PaymentEntity]),
    CartModule,
    NotificationsModule,
  ],
  providers: [HistoryService, HistoryResolver],
  controllers: [HistoryController],
  exports: [HistoryService],
})
export class HistoryModule {}
