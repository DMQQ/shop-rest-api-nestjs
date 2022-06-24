import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import * as path from "path";

@Controller("/")
export class LandingController {
  @Get()
  index(@Res() response: Response) {
    response.sendFile(path.join(process.cwd(), "./src/landing/public/index.html"));
  }
}
