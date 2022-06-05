import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Get,
  Param,
  ParseIntPipe,
  BadRequestException,
  HttpStatus,
} from "@nestjs/common";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { Response } from "express";
import { createReadStream } from "fs";

import { join } from "path";

@Controller("upload")
export class FilesController {
  constructor(private uploadService: UploadService) {}

  @Post("/:prod_id")
  @UseInterceptors(
    FileInterceptor("image", {
      dest: "images",
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param("prod_id", ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    if (file) {
      this.uploadService.uploadProps(id, file.filename).then((res) => {
        if (res) {
          return response.status(201).send({ filename: file.filename });
        }
      });
    } else {
      throw new BadRequestException("No files recived");
    }
  }

  @Get("images=:img")
  getUploadedFile(@Param("img") img: string, @Res() res: Response) {
    if (typeof img === "undefined") return res.status(HttpStatus.NOT_ACCEPTABLE);
    const file = createReadStream(join(process.cwd(), `./images/${img}`)).on("error", (err) => {
      res.status(404).send({ error: "Image not found", statusCode: 404, message: [] });
    });

    return file.pipe(res);
  }
}
