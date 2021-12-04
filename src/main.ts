import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, "192.168.0.25", () =>
    console.log("\x1b[32m", "[Server] Server runs on http://192.168.0.25:3000"),
  );
}
bootstrap();
