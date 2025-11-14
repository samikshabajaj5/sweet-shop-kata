import { Request, Response } from "express";
import {
  createSweetService,
  listSweetsService,
  searchSweetsService,
  updateSweetService,
  deleteSweetService,
} from "../services/sweetsService";
import { sendResponse } from "../utils/sendResponse";

export const createSweet = async (req: Request, res: Response) => {
  const sweet = await createSweetService(req.body);

  return sendResponse(res, {
    statusCode: 201,
    data: sweet,
  });
};

export const getAllSweets = async (req: Request, res: Response) => {
  const sweets = await listSweetsService();

  return sendResponse(res, {
    statusCode: 200,
    data: sweets,
  });
};

export const searchSweets = async (req: Request, res: Response) => {
  const sweets = await searchSweetsService(req.query as any);

  return sendResponse(res, {
    statusCode: 200,
    data: sweets,
  });
};

export const updateSweet = async (req: Request, res: Response) => {
  const sweet = await updateSweetService(req.params.id, req.body);

  return sendResponse(res, {
    statusCode: 200,
    data: sweet,
  });
};

export const deleteSweet = async (req: Request, res: Response) => {
  await deleteSweetService(req.params.id);

  return sendResponse(res, {
    statusCode: 200,
    message: "Sweet deleted",
  });
};
