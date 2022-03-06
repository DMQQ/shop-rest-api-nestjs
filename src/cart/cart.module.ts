import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartController } from "./cart.controller";
import { CartEntity } from "./cart.entity";
import { CartResolver } from "./cart.resolver";
import { CartService } from "./cart.service";

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  providers: [CartService, CartResolver],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
