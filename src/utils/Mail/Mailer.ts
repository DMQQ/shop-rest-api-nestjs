import { Injectable } from "@nestjs/common";
import { setApiKey, send } from "@sendgrid/mail";

interface EmailTemplate {
  to: string;
  subject: string;
  text: string;
  html: string;
}

@Injectable()
export class Mailer {
  constructor() {
    this.init();
  }

  private async init() {
    try {
      setApiKey(process.env.SENDGRID_KEY);
    } catch (error) {}
  }

  sendMail(message: EmailTemplate): Promise<any> {
    return send({ ...message, from: process.env.EMAIL });
  }

  notifyAuctionEndToSeller(to: string, auction_title: string, total: number) {
    return send({
      from: process.env.EMAIL,
      to,
      text: `
        Hello your product: ${auction_title} auction has ended.
        You can see your product in your dashboard.
        Thank you for using our service.
        
      `,
      subject: "Auction ended: " + auction_title,
    });
  }

  notifyAuctionEnd(to: string, auction_id: string, auction_title: string): Promise<any> {
    return send({
      from: process.env.EMAIL,
      to: to,
      text: `
        Hello, this is message from auction system, 
        you won ${auction_title} auction. 
        Auction_id for more info: ${auction_id}.
        You have 7 days to pay for your auction.
        You can pay in auction dashboard or in your account.
        If you don't pay, auction will be closed.
        Thank you for using our service.
      `,
      subject: "You won auction",
    });
  }
}
