import { Router } from "express";
import { register, login } from "../controllers/authController";

const router = Router();

router.post("/register", register);
router.post("/login", login);
/*
 * router.post("/logout", logout);
 * router.post("/refresh", refreshToken);
 * router.get("/me", authMiddleware, getCurrentUser);
 * router.post("/verify-email", verifyEmail);
 **/

export default router;
