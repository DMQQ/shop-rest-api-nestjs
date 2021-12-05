import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

const PORT = process.env.PORT || "192.168.0.25:3000";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, PORT, () =>
    console.log("\x1b[32m", `[Server] Server runs on http://${PORT}`),
  );
}
bootstrap();
