import Sweet from "../models/Sweet";
import { Op } from "sequelize";

export class NotFoundError extends Error {}
export class ValidationError extends Error {}

export const findSweetById = async (id: string | number) => {
  const sweet = await Sweet.findByPk(id);
  if (!sweet) throw new NotFoundError("Sweet not found");
  return sweet;
};

export const createSweetService = async (payload: {
  name: string;
  category: string;
  price: number;
  quantity: number;
}) => {
  // basic validation
  if (!payload.name || !payload.category)
    throw new ValidationError("Missing required fields");
  if (typeof payload.price !== "number" || typeof payload.quantity !== "number")
    throw new ValidationError("Price and quantity must be numbers");

  const sweet = await Sweet.create(payload as any);
  return sweet;
};

export const listSweetsService = async () => {
  return await Sweet.findAll();
};

export const searchSweetsService = async (query: {
  name?: string;
  category?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
}) => {
  const filters: any = {};
  if (query.name) filters.name = { [Op.like]: `%${query.name}%` };
  if (query.category) filters.category = query.category;
  if (query.minPrice !== undefined || query.maxPrice !== undefined) {
    filters.price = {};
    if (query.minPrice !== undefined)
      filters.price[Op.gte] = Number(query.minPrice);
    if (query.maxPrice !== undefined)
      filters.price[Op.lte] = Number(query.maxPrice);
  }

  return await Sweet.findAll({ where: filters });
};

export const updateSweetService = async (
  id: string | number,
  payload: Partial<{
    name: string;
    category: string;
    price: number;
    quantity: number;
  }>,
) => {
  const sweet = await findSweetById(id);
  await sweet.update(payload as any);
  return sweet;
};

export const deleteSweetService = async (id: string | number) => {
  const sweet = await findSweetById(id);
  await sweet.destroy();
  return true;
};

export const adjustQuantity = async (id: string | number, delta: number) => {
  const sweet = await findSweetById(id);
  const current = sweet.getDataValue("quantity");
  const newQty = current + delta;
  if (newQty < 0) throw new ValidationError("Insufficient quantity");
  await sweet.update({ quantity: newQty });
  return sweet;
};
