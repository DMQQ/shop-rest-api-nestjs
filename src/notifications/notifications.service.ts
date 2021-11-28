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

  notificationsSettings(value: boolean, user_id: number): Promise<any> {
    return this.notifyRepository.update({ user_id }, { enabled: value });
  }

  getUserStatus(user_id: number) {
    return this.notifyRepository.findOne({
      select: ["enabled"],
      where: { user_id },
    });
  }

  getUserToken(user_id: number) {
    return this.notifyRepository.findOne({
      select: ["token"],
      where: { user_id },
    });
  }
}
