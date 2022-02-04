import { setApiKey, send } from "@sendgrid/mail";

interface EmailTemplate {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export class Mailer {
  constructor() {
    this.init();
  }

  async init() {
    try {
      setApiKey(process.env.SENDGRID_KEY);
    } catch (error) {
      console.warn(error);
    }
  }

  sendMail(message: EmailTemplate): Promise<any> {
    return send({ ...message, from: process.env.EMAIL });
  }
}
