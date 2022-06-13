import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Expo, { ExpoPushMessage } from "expo-server-sdk";
import { Repository, UpdateResult } from "typeorm";
import { NotificationsEntity } from "./notifications.entity";

@Injectable()
export class NotificationsService {
  private expo: Expo;
  constructor(
    @InjectRepository(NotificationsEntity)
    private readonly notifyRepository: Repository<NotificationsEntity>,
  ) {
    this.expo = new Expo();
  }

  async single(id: number, message: Omit<ExpoPushMessage, "to">) {
    return this.findUsersToken(id).then(async (res) => {
      await this.expo.sendPushNotificationsAsync([
        {
          to: res.token,
          ...message,
        },
      ]);
    });
  }

  saveToken(token: string, user_id: number) {
    return this.notifyRepository.insert({ token, user_id });
  }

  findUsersToken(user_id: number): Promise<NotificationsEntity> {
    return this.notifyRepository.findOne({ user_id });
  }

  getTokens(): Promise<NotificationsEntity[]> {
    return this.notifyRepository.find({ where: { enabled: true } });
  }

  notificationsSettings(value: boolean, user_id: number): Promise<UpdateResult> {
    return this.notifyRepository.update({ user_id }, { enabled: value });
  }

  getUserStatus(user_id: number): Promise<NotificationsEntity> {
    return this.notifyRepository.findOne({
      select: ["enabled"],
      where: { user_id },
    });
  }

  getUserToken(user_id: number): Promise<NotificationsEntity> {
    return this.notifyRepository.findOne({
      select: ["token"],
      where: { user_id },
    });
  }

  async notifyAll(fn: (arg: string[]) => ExpoPushMessage[]) {
    return this.getTokens()
      .then((res) => res.map(({ token }) => token))
      .then((tokens) => {
        this.expo.sendPushNotificationsAsync(fn(tokens));
      });
  }

  async purchaseNotification(user_id: number) {
    const { token } = await this.getUserToken(user_id);

    if (token) {
      await this.expo.sendPushNotificationsAsync([
        {
          to: token,
          sound: "default",
          body: "❤ Purchase copy can be found in your mail box ❤",
          title: "❤ Thank you for purchase ❤",
          badge: 1,
          ttl: 10,
        },
      ]);
    }
  }

  async dailySale() {
    this.getTokens().then((tokens) => {
      this.expo.sendPushNotificationsAsync(
        tokens.map(({ token }) => ({
          to: token,
          title: "Daily discount just hit, check it out",
          body: "20% off on a daily product",
        })),
      );
    });
  }
}
