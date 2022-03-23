import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { RequestExtend } from "../../@types/types";

const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as RequestExtend;

  // @ts-ignore magic but works for now XD
  if (ctx?.args[2]?.req?.baseUrl === "/graphql") {
    // @ts-ignore
    return ctx.args[2].req.user_id as any;
  }

  return request.user_id as number;
});

export default User;
