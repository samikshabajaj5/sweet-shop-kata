import { Request, Response } from "express";
import {
  createSweetService,
  listSweetsService,
  searchSweetsService,
  updateSweetService,
  deleteSweetService,
} from "../services/sweetsService";

export const createSweet = async (req: Request, res: Response) => {
  const sweet = await createSweetService(req.body);
  return res.status(201).json({ success: true, data: sweet });
};

export const getAllSweets = async (req: Request, res: Response) => {
  const sweets = await listSweetsService();
  return res.status(200).json({ success: true, data: sweets });
};

export const searchSweets = async (req: Request, res: Response) => {
  const sweets = await searchSweetsService(req.query as any);
  return res.status(200).json({ success: true, data: sweets });
};

export const updateSweet = async (req: Request, res: Response) => {
  const sweet = await updateSweetService(req.params.id, req.body);
  return res.status(200).json({ success: true, data: sweet });
};

export const deleteSweet = async (req: Request, res: Response) => {
  await deleteSweetService(req.params.id);
  return res.status(200).json({ success: true, message: "Sweet deleted" });
};
