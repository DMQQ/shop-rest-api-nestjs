import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { ProductsService } from "./products.service";
import { Cron, Interval } from "@nestjs/schedule";
import { RatingsService } from "../ratings/ratings.service";

@Injectable()
export class SaleSchedule {
  constructor(
    private readonly productsService: ProductsService,
    private readonly notifiService: NotificationsService,
    private readonly ratingService: RatingsService,
  ) {}

  @Cron("* * 1 * * *")
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

  @Cron("* * 1 * * *")
  async setDailySale() {
    try {
      // set current product price to amount before sale
      const current = (await this.productsService.getDailySaleProduct()).results;

      const oldPrice = Number(current.price * 1.2);

      await this.productsService.updatePrice(current.prod_id, oldPrice);

      // get product ids that are going to be on sale
      const ids = await this.productsService.getProductsIds();
      const N = ids.length;

      let randomId = ids[Math.trunc(Math.random() * N)].prod_id;

      while (randomId === current.prod_id) {
        randomId = ids[Math.trunc(Math.random() * N)].prod_id;
      }

      await this.productsService.setDailySaleProduct(randomId);

      const { price } = await this.productsService.getById(randomId);

      const discount = Number((price * 0.8).toFixed(2));
      await this.productsService.applyDiscount(randomId, discount);

      await this.notifiService.dailySale();
    } catch (error) {
      console.warn(error);
    }
  }
}
