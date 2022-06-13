export interface SavePurchase {
  products: number[];
  user_id: number;

  payment_method: string;

  client_secret: string;

  total_price: number;
}

export interface PurchaseProps {
  products: number[];
  user_id: number;
  total_price: number;
  client_secret: string;
  payment_method: string;
}
