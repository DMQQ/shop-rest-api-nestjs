import { json } from "body-parser";
import { ServerResponse } from "http";

export function rawOrdersMiddleware() {
  return json({
    verify: (req: any, res: ServerResponse, buffer: Buffer) => {
      if (req.url === "/payments/webhook" && Buffer.isBuffer(buffer)) {
        req.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}
