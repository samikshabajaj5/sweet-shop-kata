import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  const user = await registerUserService(req.body);

  return res.status(201).json({
    success: true,
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { token, user } = await loginUserService(
    req.body.email,
    req.body.password,
  );

  return res.status(200).json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    },
  });
};
