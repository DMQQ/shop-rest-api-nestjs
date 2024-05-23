import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app/app.module";
import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { APP_PIPE } from "@nestjs/core";

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
  });

  let account = {
    email: "test@gmail.com",
    password: "123456",
  };

  it("It creates an account", async () => {
    return await request(app.getHttpServer())
      .post("/auth/register")
      .send(account)
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        expect(res.body.status).toBe(HttpStatus.CREATED);
        expect(res.body.activated).toBe(false);
        expect(res.body.user_id).toBeDefined();
      });
  });

  it("Cant duplicate account", async () => {
    return await request(app.getHttpServer())
      .post("/auth/register")
      .send(account)
      .expect(HttpStatus.CONFLICT)
      .expect((res) => {
        expect(res.body.statusCode).toBe(HttpStatus.CONFLICT);
        expect(res.body.message).toBe(`Account with ${account.email} already exists`);
      });
  });

  it("Fails register validation", async () => {
    return await request(app.getHttpServer())
      .post("/auth/register")
      .send({
        email: "",
        password: "invalid",
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it("Not Activated account", () => {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send(account)
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(res.body.message).toBe("Account not activated");
      });
  });

  const activated_account = {
    email: "activated@gmail.com",
    password: "securepassword123",
  };

  it("Creates account and activates it", async () => {
    const res = await request(app.getHttpServer())
      .post("/auth/register")
      .send(activated_account)
      .expect(HttpStatus.CREATED);

    const activationToken = res.body.token;

    return await request(app.getHttpServer())
      .post("/auth/confirm-account")
      .send({ token: activationToken })
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.message).toBe("success");
      });
  });

  it("Fails to login with invalid password", async () => {
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        ...activated_account,
        password: "incorrectpassword123",
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect((res) => {
        expect(res.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(res.body.message).toBe("Invalid email or password");
      });
  });

  it("Fails to login to not existing account", async () => {
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "null@gmail.com",
        password: "stronglongpassword123",
      })
      .expect(HttpStatus.NOT_FOUND)
      .expect((res) => {
        expect(res.body.statusCode).toBe(HttpStatus.NOT_FOUND);
        expect(res.body.message).toBe("Account not found");
      });
  });

  it("Logs in successfully", async () => {
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send(activated_account)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.role).toBeDefined();
        expect(res.body.token).toBeDefined();
        expect(res.body.name).toBe(activated_account.email);
        expect(res.body.user_id).toBeDefined();
        expect(res.body.status).toBe("verified");

        auth_token = res.body.token;
      });
  });

  it("Fails to activate account with invalid token", async () => {
    return await request(app.getHttpServer())
      .post("/auth/confirm-account")
      .send({ token: "invalid" })
      .expect(HttpStatus.BAD_REQUEST);
  });

  const patch_account = {
    address: "1234 Main St",
    phone_number: "+48123456789",
    name: "John Doe",
    surname: "Doe",
  };

  //these requires token to be sent in headers, to be fixed later
  it("Creates account credentials", () => {
    return request(app.getHttpServer())
      .patch("/auth/credentials")
      .set("token", auth_token)
      .send(patch_account)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.statusCode).toBe(HttpStatus.OK);
        expect(res.body.message).toBe("updated");
      });
  });

  it("Get account credentials", () => {
    return request(app.getHttpServer())
      .get("/auth/credentials")
      .set("token", auth_token)
      .expect(HttpStatus.OK)
      .expect((res) => {
        expect(res.body.address).toBe(patch_account.address);
        //  expect(res.body.phone_number).toBe(patch_account.phone_number);
        expect(res.body.name).toBe(patch_account.name);
        expect(res.body.surname).toBe(patch_account.surname);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
