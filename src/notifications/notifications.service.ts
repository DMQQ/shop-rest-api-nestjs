import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationsEntity } from "./notifications.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationsEntity)
    private notifiRepository: Repository<NotificationsEntity>,
  ) {}

  pushTokenToDataBase(token: string, user_id: number) {
    return this.notifiRepository.save({ token, user_id });
  }
}
