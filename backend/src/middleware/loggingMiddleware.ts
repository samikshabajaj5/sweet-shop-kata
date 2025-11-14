import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";

export interface RequestWithId extends Request {
  requestId?: string;
}

export const loggingMiddleware = (
  req: RequestWithId,
  res: Response,
  next: NextFunction,
) => {
  const requestId = randomUUID();
  req.requestId = requestId;

  const start = Date.now();

  console.log(`[${requestId}] → ${req.method} ${req.originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${requestId}] ← ${req.method} ${req.originalUrl} | ${res.statusCode} | ${duration}ms`,
    );
  });

  next();
};
