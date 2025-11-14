import { Router } from "express";
import {
  purchaseSweet,
  restockSweet,
} from "../controllers/inventoryController";

import { authenticate, isAdmin } from "../middleware/authMiddleware";

import { validate } from "../middleware/validate";
import { purchaseSchema, restockSchema } from "../schemas/inventory.schema";

import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

// Must be logged in
router.use(authenticate);

router.post(
  "/:id/purchase",
  validate(purchaseSchema, "params"),
  asyncHandler(purchaseSweet),
);

router.post(
  "/:id/restock",
  isAdmin,
  validate(restockSchema),
  asyncHandler(restockSweet),
);

export default router;
