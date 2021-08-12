import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  Get,
  Param,
} from "@nestjs/common";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import { Response } from "express";

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
    @Param("prod_id") id: number,
    @Res() response: Response,
  ) {
    if (file) {
      console.log(file);
      this.uploadService.uploadProps(id, file.filename).then(() => {
        response.status(201).send({ filename: file.filename });
      });
    }
  }

  @Get(":img")
  getUploadedFile(@Param("img") img: string, @Res() res: Response) {
    return res.sendFile(img, { root: "./images" });
  }
}
