import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { validate } from "../middleware/validate";
import {
  createSweet,
  deleteSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
} from "../controllers/sweetsController";
import {
  purchaseSweet,
  restockSweet,
} from "../controllers/inventoryController";

const router = Router();

// Create sweet
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

// List sweets
router.get("/", authMiddleware, getAllSweets);

// Search
router.get("/search", authMiddleware, searchSweets);

// Update
router.put("/:id", authMiddleware, updateSweet);

// Purchase
router.post("/:id/purchase", authMiddleware, purchaseSweet);

// Restock (admin only)
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);

export default router;
