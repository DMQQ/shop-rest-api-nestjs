import { Body, Controller, Get, NotFoundException, Post, Put, Res } from "@nestjs/common";
import { CredentialsType, UsersService } from "./users.service";
import { Response } from "express";
import { UserDto } from "./dto/user.dto";
import User from "../decorators/User";
import * as path from "path";

@Controller("auth")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("login")
  async login(@Body() { email, password }: UserDto, @Res() response: Response) {
    try {
      const result = await this.userService.findMatchOrFail(email);

      if (typeof result !== "undefined" && !result.activated) {
        return response.status(400).send({
          statusCode: 400,
          message: "Account not activated",
        });
      }
      const isValid = await this.userService.comparePasswords(result.password, password);

      if (!isValid) {
        response.status(400).send({
          status: 400,
          message: "Invalid password",
        });
      }
      const token = this.userService.createToken({
        email: result.email,
        id: result.id,
      });

      return response.send({
        token,
        name: result.email,
        user_id: result.id,
        status: "verified",
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post("register")
  async register(@Body() { email, password }: UserDto, @Res() response: Response) {
    const res = await this.userService.findMatch(email);

    if (typeof res !== "undefined") {
      return response.status(400).send({
        status: 400,
        message: "Account with that email already exists",
      });
    }

    const hashed = await this.userService.createHashedPassword(password);

    if (hashed) {
      const result = await this.userService.createUser(email, hashed);

      const token = this.userService.createToken({
        email,
        id: result.raw.insertId,
      });

      this.userService.sendConfirmationEmail(email, token).then(() => {
        console.log("email sent");
      });
      response.status(201).send({
        status: 201,
        activated: false,
        user_id: result.raw.insertId,
      });
    }
  }

  @Post("token")
  validateToken(@User() user_id: number, @Res() response: Response) {
    const token = this.userService.createToken({ id: user_id });
    return response.send({ token, id: user_id });
  }

  @Get("/confirm")
  confirmEmailPage(@Res() response: Response) {
    response.sendFile(path.join(process.cwd(), "./src/users/View/index.html"));
  }

  @Post("/confirm-account")
  confirmEmail(@Body("token") token: string, @Res() response: Response) {
    this.userService.verifyToken<{ id: number }>(token, async (err, decoded) => {
      if (decoded) {
        try {
          const { affected } = await this.userService.activateUser(decoded.id);
          if (affected > 0) {
            return response.send({
              message: "success",
            });
          }
        } catch (error) {}
      } else if (err) {
        return response.status(400).send({
          message: "failed",
        });
      }
    });
  }

  @Put("/credentials")
  updateCredentials(@Body() value: CredentialsType, @User() id: number, @Res() response: Response) {
    const valid = ["address", "phone_number", "name", "surname"];

    const [key] = Object.keys(value);

    if (!valid.includes(key) && value[key] !== undefined)
      return response.status(400).send({
        message: "invalid field",
      });

    this.userService
      .updateCredentials(
        {
          value: value[key],
          key: key,
        },
        id,
      )
      .then(({ affected }) => {
        if (affected > 0) {
          return response.send({
            message: "updated",
          });
        } else {
          return response.status(400).send({
            message: "failed",
          });
        }
      })
      .catch(console.warn);
  }

  @Get("/credentials")
  getUserCredentials(@User() id: number) {
    return this.userService.getCredentials(id);
  }
}
