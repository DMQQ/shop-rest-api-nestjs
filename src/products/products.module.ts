import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "./products.controller";
import { ProductsEntity } from "./products.entity";
import { ProductsService } from "./products.service";
import { SearchHistoryEntity } from "./searchHistory.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity, SearchHistoryEntity])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
