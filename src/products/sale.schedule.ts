import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { NotificationsService } from "src/notifications/notifications.service";
import { expo } from "src/notifications/methods";
import { ProductsService } from "./products.service";

@Injectable()
export class SaleSchedule {
  constructor(
    private readonly productsService: ProductsService,
    private readonly notifiService: NotificationsService,
  ) {}

  // @Interval(864_000_00) // 24h
  setDailySale() {
    this.productsService.getProductsIds().then((ids) => {
      const N = ids.length;

      const random = ids[Math.trunc(Math.random() * N)].prod_id;

      this.productsService
        .setDailySaleProduct(random)
        .then(() => {
          this.notifiService.getTokens().then((tokens) => {
            expo.sendPushNotificationsAsync(
              tokens.map(({ token }) => ({
                to: token,
                title: "Daily discount just hit, check it out",
                body: "20% off on a daily product",
              })),
            );
          });
        })
        .catch((err) => {
          console.warn(err);
        });
    });
  }
}
