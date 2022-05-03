import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { ProductsService } from "./products.service";
import { Interval } from "@nestjs/schedule";

@Injectable()
export class SaleSchedule {
  constructor(
    private readonly productsService: ProductsService,
    private readonly notifiService: NotificationsService,
  ) {}

  @Interval(864_000_00) // 24h
  async setDailySale() {
    try {
      const ids = await this.productsService.getProductsIds();
      const N = ids.length;

      const random = ids[Math.trunc(Math.random() * N)].prod_id;

      await this.productsService.setDailySaleProduct(random);

      const { price } = await this.productsService.getById(random);

      const discount = Number((price * 0.8).toFixed(2));
      await this.productsService.applyDiscount(random, discount);

      await this.notifiService.dailySale();
    } catch (error) {
      console.warn(error);
    }
  }
}
