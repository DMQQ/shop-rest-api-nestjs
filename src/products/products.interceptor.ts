import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map } from "rxjs";
import { ProductsEntity } from "./entities/products.entity";

@Injectable()
export class OneImageInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map(([results, amount]: [ProductsEntity[], number]) => [
        results.map(({ img_id, ...rest }) => ({
          ...rest,
          img_id: [img_id?.[0]],
        })),
        amount,
      ]),
    );
  }
}
