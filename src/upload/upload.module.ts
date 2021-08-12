import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesController } from "./upload.controller";
import { UploadEntity } from "./upload.entity";
import { UploadService } from "./upload.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UploadEntity]),
    MulterModule.register({
      dest: "./images",
    }),
  ],
  providers: [UploadService],
  controllers: [FilesController],
  exports: [UploadService],
})
export class UploadModule {}
