import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductsEntity } from "../products/Entities/products.entity";
import { Repository } from "typeorm";
import { HistoryEntity } from "./history.entity";
import { Stripe } from "stripe";

@Injectable()
export class HistoryService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,

    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_TEST_SECRET, {
      apiVersion: "2020-08-27",
      typescript: true,
    });
  }

  createIntent(total: number) {
    return this.stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
    });
  }

  constructEventPayload(sig: string, payload: Buffer) {
    const webhookSec = process.env.STRIPE_WEBHOOK_KEY;

    return this.stripe.webhooks.constructEvent(payload, sig, webhookSec);
  }

  async getTotalPriceOfSelectedProducts(ids: number[]) {
    return this.productsRepository
      .findByIds(ids, {
        select: ["price"],
      })
      .then((values) => {
        return values.map(({ price }) => +price).reduce((a, b) => a + b);
      });
  }

  async addHistory(
    products: number[],
    { user_id, date }: { user_id: number; date: string },
  ): Promise<"finished" | "failed"> {
    let status = true;

    const fnArray = products.map((id) =>
      this.historyRepository.insert({
        user_id,
        date,
        prod_id: id,
        status: "finished",
      }),
    );

    try {
      const result = await Promise.all(fnArray);
      if (result.some(({ raw }) => raw.affectedRows === 0)) {
        status = false;
      }
    } catch (error) {}

    return status ? "finished" : "failed";
  }

  getHistory(id: number): Promise<[HistoryEntity[], number]> {
    return this.historyRepository.findAndCount({
      where: { user_id: id },
      relations: ["prod_id", "img_id"],
      order: { date: "DESC" },
    });
  }

  getHistoryGQL(user_id: number, skip = 0) {
    return this.historyRepository.find({
      where: { user_id },
      relations: ["prod_id", "prod_id.img_id"],
      order: { date: "DESC" },
      skip,
      take: 10,
    });
  }

  getUserPurchasedProduct(user_id: number, prod_id: number) {
    return this.historyRepository.findOneOrFail({
      relations: ["prod_id"],
      where: {
        user_id,
        prod_id,
      },
    });
  }
}
