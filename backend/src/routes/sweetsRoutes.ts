import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
} from "../controllers/sweetsController";

const router = Router();

// Protected routes
router.post("/", authMiddleware, createSweet);
router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);
router.put("/:id", authMiddleware, updateSweet);
router.delete("/:id", authMiddleware, adminMiddleware); // always returns 403

export default router;
