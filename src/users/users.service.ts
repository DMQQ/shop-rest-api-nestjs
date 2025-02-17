import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository, UpdateResult } from "typeorm";
import { UsersEntity } from "./users.entity";
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Mailer } from "../utils/Mail/Mailer";
import { UserConfirmHTML } from "../utils/Mail/templates/UserConfirm";

const KEY = process.env.JWTTOKEN || "dhbada8d##!%aaad778464";

export type CredentialsType = "address" | "phone_number" | "name" | "surname";

interface CredentialsProps {
  key: string;
  value: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    private mailer: Mailer,
  ) {}

  sendConfirmationEmail(email: string, token: string): Promise<void> {
    return this.mailer.sendMail({
      html: UserConfirmHTML(token),
      to: email,
      subject: "Confirm your account",
      text: "Hello, please confirm your account",
    });
  }

  findMatchOrFail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      select: ["password", "id", "activated", "email", "user_type", "last_active"],
    });
  }

  findMatch(email: string): Promise<UsersEntity> {
    return this.userRepository.findOne({
      where: {
        email,
      },
      select: ["password", "id", "activated", "email"],
    });
  }

  async comparePasswords(hashed: string, password: string): Promise<boolean> {
    return compare(password, hashed);
  }
  async createHashedPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  createToken<T extends { email?: string; id: number }>(body: T): string {
    return sign(body, KEY, { expiresIn: "192h" });
  }

  createUser(email: string, hashedPassword: string): Promise<InsertResult> {
    return this.userRepository.insert({
      email,
      password: hashedPassword,
      joined_at: new Date(),
    });
  }

  verifyToken<T>(token: string, callback: (err: any, decoded: T) => void): void {
    return verify(token, KEY, callback);
  }

  activateUser(id: number): Promise<UpdateResult> {
    return this.userRepository.update({ id }, { activated: true });
  }

  updateCredentials({ key, value }: CredentialsProps, id: number): Promise<UpdateResult> {
    return this.userRepository.update({ id }, { [key]: value });
  }

  getCredentials(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
      select: ["address", "email", "name", "surname", "phone_number"],
    });
  }

  createConfirmPIN() {
    let pin = "";

    while (pin.length <= 6) {
      pin += Math.floor(Math.random() * 10);
    }

    return pin;
  }
}
