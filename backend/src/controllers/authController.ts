import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  const user = await registerUserService(req.body);
  return res.status(201).json({
    message: "User registered successfully",
    data: { id: user.id },
  });
};

export const login = async (req: Request, res: Response) => {
  const { token } = await loginUserService(req.body);
  return res.status(200).json({ token });
};
