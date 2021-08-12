import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  use(req: Request | any, res: Response, next: NextFunction) {
    const token = req.headers["token"];

    if (typeof token === "string") {
      const result = this.usersService.verifyToken(token);
      if (result) {
        req.user_id = result.id;
        next();
      } else {
        res.send({
          status: 400,
          message: "invalid token ",
        });
      }
    } else {
      res.send({
        status: 400,
        message: "no token provided or token expired",
      });
    }
  }
}
