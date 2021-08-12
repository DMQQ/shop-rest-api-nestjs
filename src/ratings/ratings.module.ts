import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RatingsEntity } from "./ratings.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RatingsEntity])],
})
export class RatingsModule {}
