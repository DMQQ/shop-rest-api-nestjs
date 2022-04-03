import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import { HistoryResponse } from "./history.entity";
import { HistoryService } from "./history.service";

@Resolver()
export class HistoryResolver {
  constructor(private historyService: HistoryService) {}

  @Query(() => [HistoryResponse])
  async history(
    @User() id: number,
    @Args("skip", { nullable: true, type: () => Int }) skip: number,
  ) {
    return this.historyService.getHistoryGQL(id, skip).then((result) =>
      result.map((prod: any) => ({
        product: {
          ...prod.prod_id,
        },
        details: {
          purchase_id: prod.history_id,
          date: prod.date,
          status: prod.status,
        },
      })),
    );
  }
}
