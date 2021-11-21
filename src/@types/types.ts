import { Request } from "express";

export interface RequestExtend extends Request {
  user_id: number;
}
