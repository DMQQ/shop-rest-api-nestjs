import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "src/cart/cart.module";
import { HistoryModule } from "src/history/history.module";
import { NotificationsModule } from "src/notifications/notifications.module";
import { ProductsModule } from "src/products/products.module";
import { RatingsModule } from "src/ratings/ratings.module";
import { UploadModule } from "src/upload/upload.module";

import { UsersModule } from "src/users/users.module";
import { AppMiddleware } from "./middleware/app.middleware";

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
