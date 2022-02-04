import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository, UpdateResult } from "typeorm";
import { UsersEntity } from "./users.entity";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";

const KEY = process.env.JWTTOKEN || "dhbada8d##!%aaad778464";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  findMatch(email: string): Promise<UsersEntity> {
    return this.userRepository.findOne({ email });
  }

  async comparePasswords(hashed: string, password: string): Promise<boolean> {
    return await compare(password, hashed);
  }
  async createHashedPassword(password: string): Promise<string> {
    return hash(password, 10).then((hash: string) => hash);
  }

  createToken(body: { email?: string; id: number }): string {
    return sign(body, KEY, { expiresIn: "48h" });
  }

  createUser(email: string, hashedPassword: string): Promise<InsertResult> {
    return this.userRepository.insert({
      email,
      password: hashedPassword,
      joined_at: new Date(),
    });
  }

  verifyToken<T>(
    token: string,
    callback: (err: any, decoded: T) => void,
  ): void {
    return verify(token, KEY, callback);
  }

  activateUser(id: number): Promise<UpdateResult> {
    return this.userRepository.update({ id }, { activated: true });
  }
}
