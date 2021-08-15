import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { UsersService } from "src/users/users.service";

interface IRequestUser extends Request {
  user_id: number;
}

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  use(req: IRequestUser, res: Response, next: NextFunction) {
    const token = req.headers["token"];

    if (typeof token === "string") {
      this.usersService.verifyToken(token, (err, decoded) => {
        if (err) {
          res.status(401).send({ message: "Token expired", code: 401 });
        }
        if (decoded) {
          req.user_id = decoded.id;
          next();
        }
      });
    } else {
      res.send({
        status: 400,
        message: "no token provided",
      });
    }
  }
}
