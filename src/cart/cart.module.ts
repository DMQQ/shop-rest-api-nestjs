import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartEntity } from "./cart.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
})
export class CartModule {}
