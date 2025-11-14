import { Response, Request, NextFunction } from "express";
import { RequestWithId } from "./loggingMiddleware";

export const responseLogger = (
  req: RequestWithId,
  res: Response,
  next: NextFunction,
) => {
  const oldJson = res.json;

  res.json = function (body: any) {
    // Store body for logging after response
    res.locals.body = body;

    return oldJson.call(this, body);
  };

  res.on("finish", () => {
    const reqId = req.requestId || "no-id";
    const body = res.locals.body;

    console.log(`[${reqId}] response:`, JSON.stringify(body, null, 2));
  });

  next();
};
