import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

import * as jwt from "jsonwebtoken";
import { RequestExtend } from "../../@types/types";

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as RequestExtend;

    const tokenHeader = request.headers?.["token"] as string | undefined;

    if (typeof tokenHeader === "undefined") {
      return false;
    }

    let isValid = false;

    jwt.verify(tokenHeader, process.env.JWTTOKEN, (err, dec) => {
      if (err) {
        isValid = false;
      }
      if (dec) {
        isValid = true;

        request.user_id = dec.id;
        request.role = dec.role;
        request.email = dec.email;
      }
    });

    return isValid;
  }
}
