import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationsEntity } from "./notifications.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(NotificationsEntity)
    private notifyRepository: Repository<NotificationsEntity>,
  ) {}

  pushTokenToDataBase(token: string, user_id: number) {
    return this.notifyRepository.insert({ token, user_id });
  }

  findUsersToken(user_id: number) {
    return this.notifyRepository.findOne({ user_id });
  }

  getTokens() {
    return this.notifyRepository.find({ where: [{ enabled: true }] });
  }
}
