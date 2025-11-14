import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: "Email already in use" });
    }

    await User.create({ name, email, password: hashed });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.getDataValue("password"));
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.getDataValue("id"), email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  res.json({ token });
};
