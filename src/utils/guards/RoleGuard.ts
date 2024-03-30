import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { RequestExtend } from "../../@types/types";
import { UserEnum } from "../../users/users.entity";

@Injectable()
export class RoleGuard implements CanActivate {
  requiredRole = "";

  constructor(requiredRole: UserEnum) {
    this.requiredRole = requiredRole;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestExtend>();

    console.log(request.role, this.requiredRole);

    return request.role === this.requiredRole;
  }
}
