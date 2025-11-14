import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { BadRequestError, UnauthorizedError } from "../errors/AppError";

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

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role,
  });

  return user;
};

export const loginUserService = async (email: string, password: string) => {
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES },
  );

  return { token, user };
};
