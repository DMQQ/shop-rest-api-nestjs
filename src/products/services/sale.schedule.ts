import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../../notifications/notifications.service";
import { ProductsService } from "./products.service";
import { Cron } from "@nestjs/schedule";
import { RatingsService } from "../../ratings/ratings.service";
import { SaleService } from "./sale.service";

@Injectable()
export class SaleSchedule {
  constructor(
    private readonly productsService: ProductsService,
    private readonly notifiService: NotificationsService,
    private readonly ratingService: RatingsService,
    private readonly saleService: SaleService,
  ) {}

  // @Cron("0 0 0 * * *", { timeZone: "Europe/Warsaw" })
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

  // @Cron("0 0 0 * * *", { timeZone: "Europe/Warsaw" })
  async setDailySale() {
    try {
      const current = (await this.saleService.getDailySaleProduct()).results;

      const oldPrice = Number(current.price * 1.25);

      await this.productsService.updatePrice(current.prod_id, oldPrice);

      const ids = await this.productsService.getProductsIds();
      const N = ids.length;

      let randomId = ids[Math.trunc(Math.random() * N)].prod_id;

      while (randomId === current.prod_id) {
        randomId = ids[Math.trunc(Math.random() * N)].prod_id;
      }

      await this.saleService.setDailySaleProduct(randomId, 100);

      const { price, prod_id, title } = await this.productsService.getById(randomId);

      const discount = Number((price * 0.8).toFixed(2));
      await this.productsService.applyDiscount(randomId, discount);

      await this.notifiService.dailySale(prod_id, title);
    } catch (error) {
      console.warn(error);
    }
  }
}
