import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductsEntity } from "../products/Entities/products.entity";
import { In, Repository } from "typeorm";
import { HistoryEntity } from "./history.entity";
import { Stripe } from "stripe";
import { SavePurchase } from "./history.interface";
import { PaymentEntity } from "./payment.entity";

@Injectable()
export class HistoryService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,

    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,

    @InjectRepository(PaymentEntity) private paymentRepository: Repository<PaymentEntity>,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_TEST_SECRET, {
      apiVersion: "2020-08-27",
      typescript: true,
    });
  }

  decreaseProductAmount(products: number[]) {
    return this.productsRepository.query(
      "UPDATE products SET quantity = quantity - 1 WHERE prod_id IN (?);",
      [products.join(",")],
    );
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

  async savePurchase({ products, user_id, ...rest }: SavePurchase) {
    const map = products.map((prod_id) => ({ prod_id, user_id, status: "finished" }));

    const result = await this.historyRepository
      .createQueryBuilder("hs")
      .insert()
      .values(map)
      .execute();

    const history_id = result.identifiers?.[0].history_id as number;

    const payment = await this.paymentRepository.insert({ ...rest, history_id });

    const payment_id = payment.identifiers?.[0].payment_id as string;

    //@ts-ignore
    await this.historyRepository.update({ history_id }, { payment: payment_id });
  }

  getHistory(user_id: number) {
    return this.historyRepository
      .createQueryBuilder("hs")
      .leftJoinAndSelect("hs.prod_id", "product")
      .leftJoinAndSelect("product.img_id", "images")
      .where("hs.user_id = :user_id", { user_id })
      .getManyAndCount();
  }

  getHistoryGQL(user_id: number, skip = 0) {
    return this.historyRepository.find({
      where: { user_id },
      relations: ["prod_id", "prod_id.img_id", "payment"],
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
