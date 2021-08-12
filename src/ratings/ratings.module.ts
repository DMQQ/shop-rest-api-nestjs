import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingsController } from "./ratings.controller";
import { RatingsEntity } from "./ratings.entity";
import { RatingsService } from "./ratings.service";
import { UsersModule } from "src/users/users.module";
import { RatingsMiddleware } from "./middleware/ratings.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([RatingsEntity]), UsersModule],
  providers: [RatingsService],
  controllers: [RatingsController],
})
export class RatingsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RatingsMiddleware).forRoutes("ratings/add");
  }
}
