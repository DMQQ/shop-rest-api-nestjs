import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "./controllers/products.controller";
import { ProductsEntity } from "./entities/products.entity";
import { ProductsService } from "./services/products.service";
import { SearchHistoryEntity } from "./entities/searchHistory.entity";
import { MostSearchedEntity } from "./entities/mostSearched.entity";
import { NotificationsModule } from "../notifications/notifications.module";
import { RatingsModule } from "../ratings/ratings.module";
import { SaleEntity } from "./entities/sale.entity";
import { SaleSchedule } from "./services/sale.schedule";
import { SaleController } from "./controllers/sale.controller";
import { ProductsResolver } from "./resolvers/products.resolver";
import { SaleService } from "./services/sale.service";
import { SaleResolver } from "./resolvers/sale.resolver";
import { WatchlistModule } from "../watchlist/watchlist.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsEntity, SearchHistoryEntity, MostSearchedEntity, SaleEntity]),
    NotificationsModule,
    RatingsModule,
    WatchlistModule,
  ],
  providers: [ProductsService, SaleSchedule, ProductsResolver, SaleService, SaleResolver],
  controllers: [ProductsController, SaleController],
})
export class ProductsModule {}
