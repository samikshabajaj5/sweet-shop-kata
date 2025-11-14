import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import {
  AppError,
  BadRequestError,
  UnauthorizedError,
} from "../errors/AppError";
import dotenv from "dotenv";
dotenv.config();
// configDotenv.config()
const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const JWT_EXPIRES = "7d";

export const registerUserService = async (payload: {
  name: string;
  email: string;
  password: string;
  role?: string;
}) => {
  const { name, email, password, role = "user" } = payload;

  if (!name || !email || !password) {
    throw new BadRequestError("Name, email, and password are required");
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw new BadRequestError("Email already exists");
  }

  //   const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  return user;
};

export const loginUserService = async (data: any) => {
  const user = await User.findOne({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const valid = await user.comparePassword(data.password);

  if (!valid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  return { token };
};
