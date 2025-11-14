import { Request, Response } from "express";
import { adjustQuantity, findSweetById } from "../services/sweetsService";
import { BadRequestError } from "../errors/AppError";

// PURCHASE sweet (quantity - 1)
export const purchaseSweet = async (req: Request, res: Response) => {
  const id = req.params.id;

  const sweet = await adjustQuantity(id, -1);

  return res.status(200).json({
    success: true,
    quantity: sweet.getDataValue("quantity"),
  });
};

// RESTOCK sweet (admin only)
export const restockSweet = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { amount } = req.body;

  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
    throw new BadRequestError("Invalid restock amount");
  }

  const sweet = await adjustQuantity(id, Number(amount));

  return res.status(200).json({
    success: true,
    quantity: sweet.getDataValue("quantity"),
  });
};
