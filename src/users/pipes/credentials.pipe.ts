import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CredentialsPipe implements PipeTransform {
  private acceptedCredentials: string[];

  constructor(acceptedCredentials: string[]) {
    this.acceptedCredentials = acceptedCredentials;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    const keys = Object.keys(metadata.data || value);

    for (const key of keys) {
      if (!this.acceptedCredentials.includes(key) && value[key] !== undefined)
        throw new BadRequestException("Invalid fields");
    }

    return value;
  }
}
