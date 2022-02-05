import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserCredentials {
  name?: string;
  surname?: string;
  phone_number?: string;
  address?: string;
}
