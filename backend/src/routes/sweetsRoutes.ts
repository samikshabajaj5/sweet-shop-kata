import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { validate } from "../middleware/validate";
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
} from "../controllers/sweetsController";

const router = Router();

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

router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);
router.put("/:id", authMiddleware, updateSweet);

router.delete("/:id", authMiddleware, adminMiddleware);

export default router;
