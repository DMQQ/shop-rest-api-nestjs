import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { NextFunction } from "express";
import { RequestExtend } from "../../@types/types";
import { UsersService } from "../../users/users.service";

interface IDecodedUser {
  id: number;
  email: string;
  role: string;
}

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  use(req: RequestExtend, res: FastifyReply, next: NextFunction) {
    const token = req.headers["token"];

    if (typeof token === "string") {
      this.usersService.verifyToken<IDecodedUser>(token, (err, decoded) => {
        if (err) {
          return res
            .status(HttpStatus.FORBIDDEN)
            .send({ message: "Token expired", code: HttpStatus.FORBIDDEN });
        }
        if (decoded) {
          req.user_id = decoded.id;
          req.role = decoded.role;
          req.email = decoded.email;
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
