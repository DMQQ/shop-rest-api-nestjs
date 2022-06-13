import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import User from "../utils/decorators/User";
import { HistoryEntity } from "./history.entity";
import { HistoryService } from "./history.service";
import { PaymentEntity } from "./payment.entity";

@Resolver()
export class HistoryResolver {
  constructor(private historyService: HistoryService) {}

  @Query(() => [PaymentEntity])
  async history(
    @User() id: number,
    @Args("skip", { nullable: true, type: () => Int }) skip: number,
  ) {
    return this.historyService.getHistoryGQL(id, skip);
  }
}
