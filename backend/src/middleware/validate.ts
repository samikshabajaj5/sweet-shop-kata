import { Request, Response, NextFunction } from "express";

export const validate =
  (rules: Record<string, string[]>) =>
  (req: Request, res: Response, next: NextFunction) => {
    for (const field in rules) {
      const validators = rules[field];
      const value = (req.body as any)[field];

      if (
        validators.includes("required") &&
        (value === undefined || value === "")
      ) {
        return res.status(400).json({ error: `${field} is required` });
      }

      if (validators.includes("number") && typeof value !== "number") {
        return res.status(400).json({ error: `${field} must be a number` });
      }
    }

    next();
  };
