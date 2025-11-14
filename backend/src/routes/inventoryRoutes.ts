import { Router } from "express";
import {
  purchaseSweet,
  restockSweet,
} from "../controllers/inventoryController";

import { authenticate, isAdmin } from "../middleware/authMiddleware";

import { validate } from "../middleware/validate";
import { purchaseSchema, restockSchema } from "../schemas/inventory.schema";

const router = Router();

// Must be logged in for all inventory actions
router.use(authenticate);

// Purchase sweet (no body, only params)
router.post("/:id/purchase", validate(purchaseSchema, "params"), purchaseSweet);

// Restock sweet (admin only)
router.post(
  "/:id/restock",
  isAdmin,
  validate(restockSchema), // validates both body + params
  restockSweet,
);

export default router;
