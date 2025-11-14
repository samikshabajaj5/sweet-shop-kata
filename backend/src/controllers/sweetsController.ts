import { Request, Response } from "express";
import Sweet from "../models/Sweet";
import { Op } from "sequelize";

export const createSweet = async (req: Request, res: Response) => {
  const { name, category, price, quantity } = req.body;
  const sweet = await Sweet.create({ name, category, price, quantity });
  return res.status(201).json(sweet);
};

export const getAllSweets = async (req: Request, res: Response) => {
  const sweets = await Sweet.findAll();
  return res.status(200).json(sweets);
};

export const searchSweets = async (req: Request, res: Response) => {
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
};

export const updateSweet = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Sweet.update(req.body, { where: { id } });
  const updated = await Sweet.findByPk(id);
  return res.status(200).json(updated);
};

export const deleteSweet = async (req: Request, res: Response) => {
  // adminMiddleware blocks deletion — no need to implement
  return res.status(500).json({ error: "Should not reach here" });
};
