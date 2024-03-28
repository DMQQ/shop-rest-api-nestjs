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
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LandingModule } from "../landing/landing.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): any => ({
        type: configService.get("CONNECTION"),
        host: configService.get("HOST"),
        port: +configService.get("PORT"),
        username: configService.get("NAME"),
        password: configService.get("PASS"),
        database: configService.get("DATABASE"),
        entities: ["dist/**/*.entity{.ts,.js}"],

        synchronize: true,
      }),
      inject: [ConfigService],
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

    LandingModule,

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

        { method: RequestMethod.GET, path: "/" },
        { method: RequestMethod.GET, path: "/graphql" },
        { method: RequestMethod.GET, path: "/landing" },
      )
      .forRoutes("*");
  }
}
