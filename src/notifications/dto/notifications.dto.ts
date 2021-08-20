import { IsString, IsNotEmpty } from "class-validator";

export class NotificationsDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
