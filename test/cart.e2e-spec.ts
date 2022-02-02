import * as request from "supertest";

import { Test } from "@nestjs/testing";

import { CartModule } from "../src/cart/cart.module";
import { CartService } from "../src/cart/cart.service";
import { INestApplication } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartEntity } from "../src/cart/cart.entity";

describe("Cart", () => {
  let app: INestApplication;
  let cartService = {};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CartModule, TypeOrmModule.forRoot()],
    })
      .overrideProvider(CartService)
      .useValue(cartService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("/GET", () => {});

  afterAll(async () => {
    await app?.close();
  });
});
