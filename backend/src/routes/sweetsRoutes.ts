import { Router } from "express";
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} from "../controllers/sweetsController";

import { authenticate, isAdmin } from "../middleware/authMiddleware";

import { validate } from "../middleware/validate";
import {
  createSweetSchema,
  updateSweetSchema,
  searchSweetSchema,
} from "../schemas/sweet.schema";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

// Protected
router.use(authenticate);

router.post("/", validate(createSweetSchema), asyncHandler(createSweet));

router.get("/", asyncHandler(getAllSweets));

router.get(
  "/search",
  validate(searchSweetSchema, "query"),
  asyncHandler(searchSweets),
);

router.put("/:id", validate(updateSweetSchema), asyncHandler(updateSweet));

router.delete("/:id", isAdmin, asyncHandler(deleteSweet));

export default router;
