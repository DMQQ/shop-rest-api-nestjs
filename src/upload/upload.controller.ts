import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Get,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { Express, response } from "express";
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
  uploadFile(
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
    }
  }

  @Get("images=:img")
  getUploadedFile(@Param("img") img: string, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), `./images/${img}`)).on(
      "error",
      (err) => console.warn(err),
    );
    return file.pipe(res);
  }
}
