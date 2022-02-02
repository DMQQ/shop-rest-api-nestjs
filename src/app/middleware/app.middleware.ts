import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { RequestExtend } from "../../@types/types";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  use(req: RequestExtend, res: Response, next: NextFunction) {
    const token = req.headers["token"];

    if (typeof token === "string") {
      this.usersService.verifyToken<{ id: number }>(token, (err, decoded) => {
        if (err) {
          return res
            .status(HttpStatus.FORBIDDEN)
            .send({ message: "Token expired", code: HttpStatus.FORBIDDEN });
        }
        if (decoded) {
          req.user_id = decoded.id;
          next();
        }
      });
    } else {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: HttpStatus.BAD_REQUEST,
        message: "no token provided",
      });
    }
  }
}
