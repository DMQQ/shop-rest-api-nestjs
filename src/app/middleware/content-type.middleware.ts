import { UnsupportedMediaTypeException } from "@nestjs/common";

export enum ContentType {
  JSON = "application/json",
  XML = "application/xml",
  TEXT = "plain/text",
}

export function AcceptMiddleware(contentType: ContentType) {
  return (req, res, next) => {
    const actualContentType = req.headers["content-type"];

    console.log("actualContentType", actualContentType);

    // if (actualContentType !== contentType)
    //   next(
    //     new UnsupportedMediaTypeException(
    //       `Invalid Content-Type, expected ${contentType}, got ${actualContentType}`,
    //     ),
    //   );

    next();
  };
}
