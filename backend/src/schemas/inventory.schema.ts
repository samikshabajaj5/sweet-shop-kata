import { z } from "zod";

export const purchaseSchema = z.object({
  id: z.string().min(1, "Sweet ID is required"),
});
export const restockSchema = z.object({
  amount: z.number().min(1, "Amount must be positive"),
});
