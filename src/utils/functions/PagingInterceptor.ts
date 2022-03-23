import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";

interface Response<T> {
  hasMore: boolean;
  amount?: number;
  results: T[];
}

@Injectable()
export class PagingInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    const args = context.getArgByIndex(0);

    return next.handle().pipe(
      map(([results, amount]: any) => ({
        hasMore: +args?.query?.skip + 5 < amount,
        results,
      })),
    );
  }
}
