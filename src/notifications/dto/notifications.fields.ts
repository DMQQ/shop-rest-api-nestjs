import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class UploadTokenQL {
  @Field()
  token: string;

  @Field()
  statusCode: number;

  @Field()
  message: string;
}
