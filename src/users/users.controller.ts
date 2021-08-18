import { Body, Controller, Post, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response } from "express";
import { UserDto } from "./dto/user.dto";

@Controller("auth")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("login")
  login(@Body() props: UserDto, @Res() res: Response) {
    const { email, password } = props;

    this.userService.findMatch(email).then(async (result) => {
      if (typeof result !== "undefined") {
        this.userService
          .comparePasswords(result.password, password)
          .then((isPasswordCorrect) => {
            if (isPasswordCorrect) {
              const token = this.userService.createToken({
                email: result.email,
                id: result.id,
              });
              res.status(200).send({
                token,
                name: result.email,
                user_id: result.id,
                status: "verified",
              });
            } else {
              res.status(400).send({
                status: 400,
                message: "Invalid password",
              });
            }
          });
      } else {
        res.status(404).send({
          status: 404,
          message: "User not found",
        });
      }
    });
  }

  @Post("register")
  register(@Body() props: UserDto, @Res() response: Response) {
    const { email, password } = props;

    this.userService.findMatch(email).then(async (res) => {
      if (res === undefined) {
        const hashed = await this.userService.createHashedPassword(password);
        if (hashed) {
          this.userService.createUser(email, hashed).then((result) => {
            console.log(res);

            const token = this.userService.createToken({
              email,
              id: result.id,
            });

            response.status(201).send({
              status: 201,
              token,
            });
          });
        }
      } else {
        response.status(400).send({
          status: 400,
          message: "Account with that email already exists",
        });
      }
    });
  }
}
