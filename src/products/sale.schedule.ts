import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { ProductsService } from "./products.service";
import { Interval } from "@nestjs/schedule";
import { RatingsService } from "../ratings/ratings.service";

@Injectable()
export class SaleSchedule {
  constructor(
    private readonly productsService: ProductsService,
    private readonly notifiService: NotificationsService,
    private readonly ratingService: RatingsService,
  ) {}

  @Interval(864_000_00 / 2)
  async setProductsRating() {
    try {
      const productIds = await this.productsService.getProductsIds();

      productIds.forEach(async ({ prod_id }) => {
        try {
          const [rating] = await this.ratingService.getAvg(prod_id);

          const avg = Math.ceil(Number(rating["AVG(rating)"] ?? 0));

          await this.productsService.updateRating(prod_id, avg);
        } catch (error) {}
      });
    } catch (error) {}
  }

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
