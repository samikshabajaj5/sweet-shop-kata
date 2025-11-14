import { z } from "zod";

export const createSweetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
});

export const updateSweetSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  price: z.number().positive().optional(),
  quantity: z.number().int().min(0).optional(),
});

export const searchSweetSchema = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  minPrice: z
    .string()
    .transform((v) => Number(v))
    .optional(),
  maxPrice: z
    .string()
    .transform((v) => Number(v))
    .optional(),
});
