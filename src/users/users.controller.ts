import { Body, Controller, Get, Post, Put, Res } from "@nestjs/common";
import { CredentialsType, UsersService } from "./users.service";
import { Response } from "express";
import { UserDto } from "./dto/user.dto";
import { BAD, CREATED } from "../constants/codes";
import User from "../decorators/User";
import * as path from "path";
import { Mailer } from "../Mail/Mailer";
import { UserConfirmHTML } from "../Mail/templates/UserConfirm";

@Controller("auth")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("login")
  login(@Body() { email, password }: UserDto, @Res() res: Response) {
    this.userService.findMatch(email).then(async (result) => {
      if (typeof result !== "undefined" && !result.activated) {
        return res.status(400).send({
          message: "Account not activated",
        });
      } else if (typeof result !== "undefined" && result.activated)
        return this.userService
          .comparePasswords(result.password, password)
          .then((isPasswordCorrect) => {
            if (isPasswordCorrect) {
              const token = this.userService.createToken({
                email: result.email,
                id: result.id,
              });

              return res.status(200).send({
                token,
                name: result.email,
                user_id: result.id,
                status: "verified",
              });
            }
            res.status(400).send({
              status: 400,
              message: "Invalid password",
            });
          });

      res.status(404).send({
        status: 404,
        message: "User not found",
      });
    });
  }

  @Post("register")
  register(@Body() { email, password }: UserDto, @Res() response: Response) {
    this.userService.findMatch(email).then(async (res) => {
      if (typeof res === "undefined") {
        const hashed = await this.userService.createHashedPassword(password);
        if (hashed) {
          this.userService.createUser(email, hashed).then(async (result) => {
            const token = this.userService.createToken({
              email,
              id: result.raw.insertId,
            });

            new Mailer()
              .sendMail({
                html: UserConfirmHTML(token),
                to: email,
                subject: "Confirm your account",
                text: "Hello, please confirm your account",
              })
              .then(() => {
                console.log("email sent");
              })
              .catch(console.warn);
            response.status(CREATED).send({
              status: CREATED,
              activated: false,
              user_id: result.raw.insertId,
            });
          });
        }
      } else {
        response.status(BAD).send({
          status: BAD,
          message: "Account with that email already exists",
        });
      }
    });
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
