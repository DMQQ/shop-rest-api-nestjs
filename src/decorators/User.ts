import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestExtend } from "src/@types/types";

const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as RequestExtend;

  return request.user_id as number;
});

export default User;
