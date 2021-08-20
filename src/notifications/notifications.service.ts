import { Injectable } from "@nestjs/common";

@Injectable()
export class NotificationsService {
  constructor() {}

  pushTokenToDataBase(token: string, user_id: number) {}
}
