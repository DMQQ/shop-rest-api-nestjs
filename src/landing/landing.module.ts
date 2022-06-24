import { Module } from "@nestjs/common";
import { LandingController } from "./landing.controller";

// Create LandingModule containing empty imports array
@Module({
  imports: [],
  controllers: [LandingController],
})
export class LandingModule {}
