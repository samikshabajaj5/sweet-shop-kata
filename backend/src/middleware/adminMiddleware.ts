import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // role should come from JWT payload
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }

  return next();
};
