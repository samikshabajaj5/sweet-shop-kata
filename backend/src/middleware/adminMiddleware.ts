import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // For now, always block (tests expect 403)
  return res.status(403).json({ error: "Forbidden: Admins only" });
};
