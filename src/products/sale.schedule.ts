import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
/* import { expo } from "src/notifications/methods"; */
import { ProductsService } from "./products.service";

@Injectable()
export class SaleSchedule {
  constructor(private readonly productsService: ProductsService) {}

  @Interval(864_000_00) // 24h
  setDailySale() {
    this.productsService.getProductsIds().then((ids) => {
      const N = ids.length;

      const random = ids[Math.trunc(Math.random() * N)].prod_id;

      this.productsService
        .setDailySaleProduct(random)
        .then(() => {
          //  expo.sendPushNotificationsAsync([]) add push notification to users
        })
        .catch((err) => {
          console.warn(err);
        });
    });
  }
}
