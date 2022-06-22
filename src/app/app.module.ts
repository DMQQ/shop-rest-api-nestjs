import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";

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

import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AuctionsModule } from "../auctions/auctions.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as "mysql" | "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    UsersModule,
    HistoryModule,
    CartModule,
    ProductsModule,
    UploadModule,
    RatingsModule,
    NotificationsModule,
    WatchlistModule,
    AuctionsModule,

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
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
        "/payments/webhook",
        { method: RequestMethod.GET, path: "/graphql" },
      )
      .forRoutes("*");
  }
}
