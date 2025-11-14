import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    // allow custom role (e.g., admin) OR default = "user"
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role || "user",
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(400).json({ error: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const storedPassword = user.getDataValue("password");

    const match = await bcrypt.compare(password, storedPassword);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    // include role inside JWT
    const token = jwt.sign(
      {
        id: user.getDataValue("id"),
        email: user.getDataValue("email"),
        role: user.getDataValue("role"), // NEW
      },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" },
    );

    return res.json({ token });
  } catch (err: any) {
    return res
      .status(500)
      .json({ error: "Login failed", details: err.message });
  }
};
