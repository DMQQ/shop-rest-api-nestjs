import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { UsersModule } from "../src/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";

describe("User", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UsersModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot({
          type: "postgres",
          host: "localhost",
          port: 5432,
          username: "username",
          password: "",
          database: "e2e_test",
          entities: ["./**/*.entity.ts"],
          synchronize: false,
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
});
