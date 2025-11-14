import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { validate } from "../middleware/validate";

import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
} from "../controllers/sweetsController";

import {
  purchaseSweet,
  restockSweet,
} from "../controllers/inventoryController";

const router = Router();

// CREATE sweet
router.post(
  "/",
  authMiddleware,
  validate({
    name: ["required"],
    category: ["required"],
    price: ["required", "number"],
    quantity: ["required", "number"],
  }),
  createSweet,
);

// LIST all
router.get("/", authMiddleware, getAllSweets);

// SEARCH sweets
router.get("/search", authMiddleware, searchSweets);

// UPDATE sweet
router.put("/:id", authMiddleware, updateSweet);

// DELETE sweet (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);

// PURCHASE sweet
router.post("/:id/purchase", authMiddleware, purchaseSweet);

// RESTOCK sweet (admin only)
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

export default router;
