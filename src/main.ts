import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";

const PORT = process.env.PORT || "192.168.0.25";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, PORT, () =>
    console.log(`[Server] Server runs on http://${PORT}:3000`),
  );
}
bootstrap();

export default bootstrap;
