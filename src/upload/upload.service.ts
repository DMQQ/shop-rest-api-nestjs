import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UploadEntity } from "./upload.entity";

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadEntity)
    private uploadRepository: Repository<UploadEntity>,
  ) {}

  uploadProps(prod_id: number, img_name: string): Promise<any> {
    return this.uploadRepository.insert({ name: img_name, prod_id });
  }

  getImagesToProducts(prod_id: number): Promise<UploadEntity[]> {
    return this.uploadRepository.find({ where: { prod_id } });
  }
}
