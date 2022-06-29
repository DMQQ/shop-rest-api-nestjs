import { Test } from "@nestjs/testing";
import { CartController } from "./cart.controller";

describe("CartController", () => {
  let catsController: CartController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CartController],
    }).compile();

    catsController = moduleRef.get<CartController>(CartController);
  });

  describe("findAll", () => {
    it("should return an array of cart items", async () => {
      const result = [
        { prod_id: 1, cart_id: 1, ammount: 2, title: "Test", price: 200, img_id: [] },
      ];

      expect(await catsController.getCart(1, 0)).toBe(result);
    });
  });
});
