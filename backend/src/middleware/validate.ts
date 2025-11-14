import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { ValidationError } from "../errors/AppError";

export const validate =
  (schema: ZodSchema, source: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[source]);
      (req as any).validated = parsed;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues.map((i) => i.message).join(", ");
        throw new ValidationError(message);
      }
      next(err);
    }
  };
