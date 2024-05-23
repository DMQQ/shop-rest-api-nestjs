import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { rawOrdersMiddleware } from "./utils/functions/buffer.middleware";
import { swaggerConfig } from "./utils/swaggerConfig";
import { FastifyAdapter } from "@nestjs/platform-fastify";

const URL = process.env.URL || "192.168.0.25";

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    //   new FastifyAdapter()
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(rawOrdersMiddleware());
  swaggerConfig(app);
  if (process.env.NODE_ENV === "development") {
    await app.listen(3000, URL, () =>
      console.log(
        `\n
       [Application]: Server runs on http://${URL}:3000 \n
       [Documentation]: Documentation runs on http://${URL}:3000/docs \n
       [GraphQL]: GraphQL web client runs on http://${URL}:3000/graphql \n
      `,
      ),
    );
  } else {
    await app.listen(process.env.APP_PORT);
  }
}
bootstrap();

export default bootstrap;
