import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/authService";
import { sendResponse } from "../utils/sendResponse";

export const register = async (req: Request, res: Response) => {
  const user = await registerUserService(req.body);

  return sendResponse(res, {
    statusCode: 201,
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

  return sendResponse(res, {
    statusCode: 200,
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
