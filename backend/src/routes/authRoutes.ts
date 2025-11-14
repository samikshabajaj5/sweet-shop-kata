import { Router } from "express";
import { register, login } from "../controllers/authController";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validate } from "../middleware/validate";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
/*
 * router.post("/logout", logout);
 * router.post("/refresh", refreshToken);
 * router.get("/me", authMiddleware, getCurrentUser);
 * router.post("/verify-email", verifyEmail);
 **/

export default router;
