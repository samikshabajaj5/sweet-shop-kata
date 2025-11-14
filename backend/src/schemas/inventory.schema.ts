import { z } from "zod";

export const purchaseSchema = z.object({
  id: z.string().min(1, "Sweet ID is required"),
});

export const restockSchema = z.object({
  id: z.string().min(1, "Sweet ID is required"),
  amount: z
    .number({
      error: "Amount is required",
      //   invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than zero"),
});
