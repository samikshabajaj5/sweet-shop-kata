import { Request, Response } from "express";
import Sweet from "../models/Sweet";
import { Op } from "sequelize";

export const createSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity } = req.body;

    const sweet = await Sweet.create({ name, category, price, quantity });
    return res.status(201).json(sweet);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Failed to create sweet", details: error.message });
  }
};

export const getAllSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await Sweet.findAll();
    return res.status(200).json(sweets);
  } catch (error: any) {
    return res.status(500).json({ error: "Failed to fetch sweets" });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filters: any = {};

    if (name) filters.name = { [Op.like]: `%${name}%` };
    if (category) filters.category = category;
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price[Op.gte] = Number(minPrice);
      if (maxPrice) filters.price[Op.lte] = Number(maxPrice);
    }

    const sweets = await Sweet.findAll({ where: filters });
    return res.status(200).json(sweets);
  } catch (error: any) {
    return res.status(500).json({ error: "Sweet search failed" });
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const sweet = await Sweet.findByPk(id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    await sweet.update(req.body);
    return res.status(200).json(sweet);
  } catch (error: any) {
    return res.status(500).json({ error: "Failed to update sweet" });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const sweet = await Sweet.findByPk(id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    await sweet.destroy();

    return res.status(200).json({ message: "Sweet deleted" });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Failed to delete sweet", details: error.message });
  }
};
