import { ApiProperty } from "@nestjs/swagger";

export class ApiLoginResponseOk {
  @ApiProperty({ description: "jwt token for authentication", type: String })
  token: string;

  @ApiProperty({ description: "user email", type: String })
  email: string;

  @ApiProperty({ description: "user id", type: Number })
  user_id: number;

  @ApiProperty({ description: "message", type: String })
  status: "verified";
}

export class ApiLoginResponseBad {
  @ApiProperty({ type: Number })
  statusCode: number;

  @ApiProperty({ type: String })
  message: string;
}

export class ApiAuthBody {
  @ApiProperty({ type: String, example: "joemama@gmail.com" })
  email: string;

  @ApiProperty({ type: String, minLength: 6, example: "joemama!" })
  password: string;
}

export class ApiRegisterResponseOk {
  @ApiProperty({ type: Number, example: 201 })
  status: number;

  @ApiProperty({ type: Boolean, default: false })
  activated: boolean;

  @ApiProperty({ type: Number })
  user_id: number;
}
