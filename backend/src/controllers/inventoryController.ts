import { Request, Response } from "express";
import Sweet from "../models/Sweet";

export const purchaseSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const sweet = await Sweet.findByPk(id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    const currentQty = sweet.getDataValue("quantity");

    if (currentQty <= 0) {
      return res.status(400).json({ error: "Out of stock" });
    }

    // decrease quantity
    const updatedQty = currentQty - 1;
    await sweet.update({ quantity: updatedQty });

    return res.status(200).json({ quantity: updatedQty });
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Purchase failed", details: err.message });
  }
};

export const restockSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { amount } = req.body;

    const sweet = await Sweet.findByPk(id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    const currentQty = sweet.getDataValue("quantity");
    const updatedQty = currentQty + Number(amount || 0);

    await sweet.update({ quantity: updatedQty });

    return res.status(200).json({ quantity: updatedQty });
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Restock failed", details: err.message });
  }
};
