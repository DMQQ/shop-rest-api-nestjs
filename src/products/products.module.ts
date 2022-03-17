import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "./products.controller";
import { ProductsEntity } from "./Entities/products.entity";
import { ProductsService } from "./products.service";
import { SearchHistoryEntity } from "./Entities/searchHistory.entity";
import { MostSearchedEntity } from "./Entities/mostSearched.entity";
import { NotificationsModule } from "../notifications/notifications.module";
import { RatingsModule } from "../ratings/ratings.module";
import { SaleEntity } from "./Entities/sale.entity";
import { SaleSchedule } from "./sale.schedule";
import { SaleController } from "./sale.controller";
import { ProductsResolver } from "./products.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, SearchHistoryEntity, MostSearchedEntity, SaleEntity]),
    NotificationsModule,
    RatingsModule,
  ],
  providers: [ProductsService, SaleSchedule, ProductsResolver],
  controllers: [ProductsController, SaleController],
})
export class ProductsModule {}
