import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { CredentialsType, UsersService } from "./users.service";
import { Response } from "express";
import { UserDto } from "./dto/user.dto";
import User from "../utils/decorators/User";
import * as path from "path";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import {
  ApiAuthBody,
  ApiLoginResponseBad,
  ApiLoginResponseOk,
  ApiRegisterResponseOk,
} from "./user.swagger";

enum CredentialsReset {
  email = "email",
  password = "password",
}

@ApiTags("auth")
@Controller("auth")
export class UsersController {
  constructor(private userService: UsersService) {}

  @HttpCode(200)
  @ApiBody({ type: ApiAuthBody })
  @ApiResponse({ status: 200, description: "Logged in successfully", type: ApiLoginResponseOk })
  @ApiResponse({ status: 400, description: "Something went wrong", type: ApiLoginResponseBad })
  @Post("login")
  async login(@Body() { email, password }: UserDto) {
    const result = await this.userService.findMatchOrFail(email);

    if (typeof result === "undefined" || !result)
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Account not found",
      });

    if (typeof result !== "undefined" && !result.activated) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Account not activated",
      });
    }
    const isValid = await this.userService.comparePasswords(result.password, password);

    if (!isValid) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Invalid email or password",
      });
    }
    const token = this.userService.createToken({
      email: result.email,
      id: result.id,
      role: result.user_type,
    });

    return {
      role: result.user_type,
      token,
      name: result.email,
      user_id: result.id,
      status: "verified",
    };
  }

  @ApiBody({ type: ApiAuthBody })
  @ApiResponse({
    status: 201,
    description: "Account created successfully",
    type: ApiRegisterResponseOk,
  })
  @ApiResponse({
    status: 400,
    description: "Account with {email} already exists",
    type: ApiLoginResponseBad,
  })
  @Post("register")
  async register(@Body() { email, password }: UserDto) {
    const res = await this.userService.findMatch(email);

    if (typeof res !== "undefined") {
      // throw new BadRequestException(`Account with ${email} already exists`);
      throw new ConflictException(`Account with ${email} already exists`);
    }

    const hashed = await this.userService.createHashedPassword(password);

    const result = await this.userService.createUser(email, hashed);

    const token = this.userService.createToken({
      email,
      id: result.raw.insertId,
    });

    this.userService.sendConfirmationEmail(email, token);

    return {
      status: 201,
      activated: false,
      user_id: result.raw.insertId,
      ...(process.env.NODE_ENV === "test" && { token }),
    };
  }

  @Post("token")
  validateToken(@User() user_id: number, @Res() response: Response) {
    const token = this.userService.createToken({ id: user_id });
    return response.send({ token, id: user_id });
  }

  @Get("/confirm")
  confirmEmailPage(@Res() response: Response) {
    response.sendFile(path.join(process.cwd(), "./src/users/View/index.html"));
  }

  @HttpCode(200)
  @Post("/confirm-account")
  confirmEmail(@Body("token") token: string, @Res() response: Response) {
    return this.userService.verifyToken<{ id: number }>(token, async (err, decoded) => {
      if (decoded) {
        const { affected } = await this.userService.activateUser(decoded.id);
        if (affected > 0) {
          return response.send({
            message: "success",
          });
        }
      } else if (err) {
        throw new BadRequestException("Couldn't confirm account");
      }
    });
  }

  @Patch("/credentials")
  //@UsePipes(new CredentialsPipe(["address", "name", "surname"]))
  async updateCredentials(
    @Body() value: CredentialsType,
    @User() id: number,
    @Res() response: Response,
  ) {
    const valid = ["address", "phone_number", "name", "surname"];

    const [key] = Object.keys(value);

    if (!valid.includes(key) && value[key] !== undefined)
      throw new BadRequestException("Invalid fields");

    const props = { value: value[key], key };

    try {
      const { affected } = await this.userService.updateCredentials(props, id);
      if (affected > 0) {
        return response.send({
          statusCode: 200,
          message: "updated",
        });
      }
    } catch (error) {
      throw new BadRequestException("Something went wrong");
    }
  }

  @Get("/credentials")
  getUserCredentials(@User() id: number) {
    return this.userService.getCredentials(id);
  }

  @Post("/:type/reset")
  changeAuthCredentials(
    @Param("type", new ParseEnumPipe(CredentialsReset)) type: CredentialsReset,
  ) {}

  @Post("/:type/reset/confirm")
  confirmChange(@Param("type", new ParseEnumPipe(CredentialsReset)) type: CredentialsReset) {}
}
