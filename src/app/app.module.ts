import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "../cart/cart.module";
import { HistoryModule } from "../payments/history.module";
import { NotificationsModule } from "../notifications/notifications.module";
import { ProductsModule } from "../products/products.module";
import { RatingsModule } from "../ratings/ratings.module";
import { UploadModule } from "../upload/upload.module";

import { UsersModule } from "../users/users.module";
import { AppMiddleware } from "./middleware/app.middleware";
import { WatchlistModule } from "../watchlist/watchlist.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    HistoryModule,
    CartModule,
    ProductsModule,
    UploadModule,
    RatingsModule,
    NotificationsModule,
    WatchlistModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .exclude(
        "/auth/login",
        "/auth/register",
        "/upload/images=:img",
        "/auth/confirm",
        "/auth/confirm-account",
        "/upload/images=:img",
      )
      .forRoutes("*");
  }
}
