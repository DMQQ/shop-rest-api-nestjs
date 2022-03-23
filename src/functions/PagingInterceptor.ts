import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map, Observable } from "rxjs";

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
    //@ts-ignore
    return next.handle().pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
    );
  }
}
