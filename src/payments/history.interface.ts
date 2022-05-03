export interface SavePurchase {
  products: number[];
  user_id: number;
  amount: number;
  client_secret: string;
  payment_method: string;
}
