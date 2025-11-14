import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { UnauthorizedError, ForbiddenError } from "../errors/AppError";
import { Request } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Fetch fresh user from DB
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }
};

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new UnauthorizedError("Not authenticated");
  }

  if (req.user.role !== "admin") {
    throw new ForbiddenError("Admin access required");
  }

  next();
};
