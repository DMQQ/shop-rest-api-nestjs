import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { ProductsEntity } from "../products/Entities/products.entity";
import { Connection, In, QueryRunner, Repository } from "typeorm";
import { HistoryEntity } from "./history.entity";
import { Stripe } from "stripe";
import { PurchaseProps, SavePurchase } from "./history.interface";
import { PaymentEntity } from "./payment.entity";
import { randomUUID } from "crypto";

@Injectable()
export class HistoryService {
  private stripe: Stripe;
  constructor(
    @InjectRepository(HistoryEntity)
    private historyRepository: Repository<HistoryEntity>,

    @InjectRepository(ProductsEntity)
    private productsRepository: Repository<ProductsEntity>,

    @InjectRepository(PaymentEntity) private paymentRepository: Repository<PaymentEntity>,

    @InjectConnection() private conn: Connection,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_TEST_SECRET!, {
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

    if (typeof webhookSec === "undefined") throw new Error("Missing webhook secret");

    return this.stripe.webhooks.constructEvent(payload, sig, webhookSec);
  }

  getHistoryGQL(user_id: number, skip = 0) {
    return this.paymentRepository.find({
      where: { user_id },
      order: { date: "DESC" },
      relations: ["products", "products.prod_id", "products.prod_id.img_id"],
      skip,
      take: 5,
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

  async purchase(props: PurchaseProps, callback?: () => Promise<void>): Promise<void> {
    const runner = this.conn.createQueryRunner();

    // await runner.connect();

    await runner.startTransaction();

    console.log("start transaction");

    try {
      await runner.query("DELETE FROM cart WHERE user_id = ?;", [props.user_id]);

      const payment_id = randomUUID();

      await runner.query(
        "INSERT INTO payment(payment_id,payment_method,client_secret,total_price,status,user_id) VALUES(?,?,?,?,?,?)",
        [
          payment_id,
          props.payment_method,
          props.client_secret,
          props.total_price / 100,
          "finished",
          props.user_id,
        ],
      );

      const products_fn = props.products.map((id) =>
        runner.query("INSERT INTO purchase_history(prod_id,payment_id) VALUES (?,?)", [
          id,
          payment_id,
        ]),
      );

      await Promise.all(products_fn);

      await runner.query("UPDATE products SET quantity = quantity - 1 WHERE prod_id IN (?);", [
        [...new Set(props.products)].join(","),
      ]);

      await callback?.();

      console.log("end transaction");

      await runner.commitTransaction();
    } catch (error) {
      console.log(error);

      await runner.rollbackTransaction();
    } finally {
      await runner.release();
    }
  }
}
