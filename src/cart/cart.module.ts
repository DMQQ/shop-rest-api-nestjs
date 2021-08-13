import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartController } from "./cart.controller";
import { CartEntity } from "./cart.entity";
import { CartService } from "./cart.service";

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
