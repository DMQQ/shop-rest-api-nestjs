import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UsersEntity } from "./users.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";

describe("DepartmentService", () => {
  const token = getRepositoryToken(UsersEntity);
  let service: UsersService;
  let repo: Repository<UsersEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: token,
          useClass: Repository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    repo = module.get(token);
  });

  test("it logges in correctly", () => {});
});
