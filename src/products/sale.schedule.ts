import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { expo } from "../notifications/methods";
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
          this.productsService.getById(random).then(({ price }) => {
            const discount = Number((price * 0.8).toFixed(2));
            this.productsService.applyDiscount(random, discount);
          });
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
