import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "./products.controller";
import { ProductsEntity } from "./Entities/products.entity";
import { ProductsService } from "./products.service";
import { SearchHistoryEntity } from "./Entities/searchHistory.entity";
import { MostSearchedEntity } from "./Entities/mostSearched.entity";
import { NotificationsModule } from "src/notifications/notifications.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductsEntity,
      SearchHistoryEntity,
      MostSearchedEntity,
    ]),
    NotificationsModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
