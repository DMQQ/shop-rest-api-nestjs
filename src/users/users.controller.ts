import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";
import { UserDto } from "./dto/user.dto";
import { NotificationsService } from "src/notifications/notifications.service";
import Expo from "expo-server-sdk";
import { BAD, CREATED } from "src/constants/codes";
import { RequestExtend } from "src/@types/types";
import User from "src/decorators/User";

const expo = new Expo();

@Controller("auth")
export class UsersController {
  constructor(
    private userService: UsersService,
    private notifyService: NotificationsService,
  ) {}

  @Post("login")
  login(@Body() { email, password }: UserDto, @Res() res: Response) {
    this.userService.findMatch(email).then(async (result) => {
      if (typeof result !== "undefined")
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
            this.notifyService.findUsersToken(result.raw.insertId).then((r) => {
              if (typeof r !== "undefined") {
                expo.sendPushNotificationsAsync([
                  {
                    to: r.token,
                    title: `Welcome ${email}`,
                    body: "Promo code for new customers: 213769420",
                  },
                ]);
              }
            });

            const token = this.userService.createToken({
              email,
              id: result.raw.insertId,
            });

            response.status(CREATED).send({
              status: CREATED,
              token,
              user_id: result.raw.insertId,
              name: email,
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
}
