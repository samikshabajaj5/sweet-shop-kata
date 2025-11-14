import { Response } from "express";

interface SendResponseOptions {
  statusCode?: number;
  data?: any;
  message?: string;
  meta?: any;
}

export const sendResponse = (
  res: Response,
  { statusCode = 200, data = null, message, meta }: SendResponseOptions,
) => {
  const responseBody: any = {
    success: true,
  };

  if (data !== null) responseBody.data = data;
  if (message) responseBody.message = message;
  if (meta) responseBody.meta = meta;

  return res.status(statusCode).json(responseBody);
};
