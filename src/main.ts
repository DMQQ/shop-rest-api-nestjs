import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { rawOrdersMiddleware } from "./utils/functions/buffer.middleware";
import { swaggerConfig } from "./utils/swaggerConfig";

const PORT = process.env.PORT || "192.168.0.25";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(rawOrdersMiddleware());
  swaggerConfig(app);
  await app.listen(3000, PORT, () =>
    console.log(
      `\n
       [Application]: Server runs on http://${PORT}:3000 \n
       [Documentation]: Documentation runs on http://${PORT}:3000/docs \n
       [GraphQL]: GraphQL web client runs on http://${PORT}:3000/graphql \n
      `,
    ),
  );
}
bootstrap();

export default bootstrap;
