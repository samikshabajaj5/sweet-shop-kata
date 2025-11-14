import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validate } from "../middleware/validate";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));

/*
 * router.post("/logout", logout);
 * router.post("/refresh", refreshToken);
 * router.get("/me", authMiddleware, getCurrentUser);
 * router.post("/verify-email", verifyEmail);
 **/

export default router;
