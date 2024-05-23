import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { APP_PIPE } from "@nestjs/core";
import { TestingModule, Test } from "@nestjs/testing";
import { AppModule } from "../src/app/app.module";

describe("AuthModule (e2e)", () => {
  let app: INestApplication;
  let auth_token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: APP_PIPE,
          useClass: ValidationPipe,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer()).post("/auth/login").send({
      email: "",
      password: "",
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
