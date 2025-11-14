import { Request, Response, NextFunction } from "express";

type ValidatorFn = (value: any) => string | null;

const required: ValidatorFn = (value) =>
  value === undefined || value === null || value === ""
    ? "This field is required"
    : null;

const isNumber: ValidatorFn = (value) =>
  typeof value !== "number" ? "Must be a number" : null;

const min =
  (minVal: number): ValidatorFn =>
  (value) =>
    typeof value === "number" && value < minVal ? `Must be >= ${minVal}` : null;

const max =
  (maxVal: number): ValidatorFn =>
  (value) =>
    typeof value === "number" && value > maxVal ? `Must be <= ${maxVal}` : null;

// Map of available validators
const validatorsMap: Record<string, ValidatorFn | ((arg: any) => ValidatorFn)> =
  {
    required,
    number: isNumber,
    min,
    max,
  };

/**
 * rules example:
 * {
 *   price: ["required", "number", min(1)]
 * }
 */
export const validate =
  (rules: Record<string, (string | ValidatorFn)[]>) =>
  (req: Request, res: Response, next: NextFunction) => {
    for (const field in rules) {
      const validators = rules[field];
      const value = (req.body as any)[field];

      for (const rule of validators) {
        let validatorFn: ValidatorFn;

        if (typeof rule === "string") {
          const mapped = validatorsMap[rule];
          if (!mapped) continue;
          validatorFn = mapped as ValidatorFn;
        } else {
          validatorFn = rule; // direct validator function
        }

        const error = validatorFn(value);
        if (error) {
          return res.status(400).json({
            error: `${field}: ${error}`,
          });
        }
      }
    }

    next();
  };
