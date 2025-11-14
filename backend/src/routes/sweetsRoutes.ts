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

const router = Router();

// Protected: must be logged in
router.use(authenticate);

router.post("/", validate(createSweetSchema), createSweet);

router.get("/", getAllSweets);

router.get("/search", validate(searchSweetSchema, "query"), searchSweets);

router.put("/:id", validate(updateSweetSchema), updateSweet);

router.delete("/:id", isAdmin, deleteSweet);

export default router;
