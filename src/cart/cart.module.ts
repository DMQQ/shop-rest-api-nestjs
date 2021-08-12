import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UploadModule } from "src/upload/upload.module";
import { CartController } from "./cart.controller";
import { CartEntity } from "./cart.entity";
import { CartService } from "./cart.service";

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity]), UploadModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
