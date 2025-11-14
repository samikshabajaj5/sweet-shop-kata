import { Request, Response } from "express";
import {
  createSweetService,
  listSweetsService,
  searchSweetsService,
  updateSweetService,
  deleteSweetService,
  NotFoundError,
  ValidationError,
} from "../services/sweetsService";

export const createSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await createSweetService(req.body);
    return res.status(201).json(sweet);
  } catch (err: any) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Failed to create sweet" });
  }
};

export const getAllSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await listSweetsService();
    return res.status(200).json(sweets);
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to fetch sweets" });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await searchSweetsService(req.query as any);
    return res.status(200).json(sweets);
  } catch (err: any) {
    return res.status(500).json({ error: "Sweet search failed" });
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const sweet = await updateSweetService(req.params.id, req.body);
    return res.status(200).json(sweet);
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Failed to update sweet" });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    await deleteSweetService(req.params.id);
    return res.status(200).json({ message: "Sweet deleted" });
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: "Failed to delete sweet" });
  }
};
