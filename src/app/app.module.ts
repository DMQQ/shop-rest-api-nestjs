import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "src/cart/cart.module";
import { HistoryModule } from "src/history/history.module";
import { ProductsModule } from "src/products/products.module";
import { RatingsModule } from "src/ratings/ratings.module";
import { UploadModule } from "src/upload/upload.module";

import { UsersModule } from "src/users/users.module";
import { WorkersModule } from "src/workers/workers.module";
import { AppMiddleware } from "./middleware/app.middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    WorkersModule,
    HistoryModule,
    CartModule,
    ProductsModule,
    UploadModule,
    RatingsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .exclude("/auth/login", "/auth/register")
      .forRoutes("*");
  }
}
