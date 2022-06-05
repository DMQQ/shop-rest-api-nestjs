export interface SavePurchase {
  products: number[];
  user_id: number;

  payment_method: string;

  client_secret: string;

  total_price: number;
}
