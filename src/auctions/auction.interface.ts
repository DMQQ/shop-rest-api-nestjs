export interface AuctionProps {
  seller: any;

  active: boolean;

  product: any;

  date_end: string;
}

export interface BidProps {
  amount: number;

  user: number;

  auction_id: string;
}
