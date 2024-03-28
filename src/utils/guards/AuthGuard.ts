import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { RequestExtend } from "../../@types/types";

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as RequestExtend;

    return request.user_id !== undefined;
  }
}
