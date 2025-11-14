import { Request, Response } from "express";
import {
  adjustQuantity,
  findSweetById,
  NotFoundError,
  ValidationError,
} from "../services/sweetsService";

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Purchase reduces quantity by 1
    const updatedSweet = await adjustQuantity(id, -1);

    return res
      .status(200)
      .json({ quantity: updatedSweet.getDataValue("quantity") });
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
    if (err instanceof ValidationError) {
      // Used for "Out of stock"
      return res.status(400).json({ error: "Out of stock" });
    }

    return res.status(500).json({ error: "Purchase failed" });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { amount } = req.body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ error: "Invalid restock amount" });
    }

    // Restock increases quantity
    const updatedSweet = await adjustQuantity(id, Number(amount));

    return res
      .status(200)
      .json({ quantity: updatedSweet.getDataValue("quantity") });
  } catch (err: any) {
    if (err instanceof NotFoundError) {
      return res.status(404).json({ error: err.message });
    }
    return res.status(500).json({ error: "Restock failed" });
  }
};
