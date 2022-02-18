import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export function swaggerConfig(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Shop rest")
    .setDescription("The shop REST-API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
}
