import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductsEntity } from "../products/Entities/products.entity";
import { Repository } from "typeorm";
import { HistoryEntity } from "./history.entity";
import { Stripe } from "stripe";
import { SavePurchase } from "./history.interface";

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

  createIntent<T extends {} = {}>(total: number, metadata?: T) {
    return this.stripe.paymentIntents.create({
      amount: total * 100,
      currency: "usd",
      metadata,
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

  async savePurchase(props: SavePurchase): Promise<"finished" | "failed"> {
    return new Promise(async (resolve, reject) => {
      const fnArray = props.products.map((id) =>
        this.historyRepository.insert({
          prod_id: id,
          status: "finished",
          ...props,
        }),
      );

      try {
        const result = await Promise.all(fnArray);
        if (result.every(({ raw }) => raw.affectedRows > 0)) {
          resolve("finished");
        }
      } catch (error) {
        reject("Saving failed");
      }
    });
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
