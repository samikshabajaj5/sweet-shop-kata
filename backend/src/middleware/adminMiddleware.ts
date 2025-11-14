import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

// Reusable role-check helper
const userHasRole = (req: AuthRequest, requiredRole: string) => {
  return req.user && req.user.role === requiredRole;
};

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // Cleanly reuse helper instead of inline logic
  if (!userHasRole(req, "admin")) {
    return res.status(403).json({ error: "Admins only" });
  }

  return next();
};
