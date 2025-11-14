import express from "express";
import cors from "cors";
import db from "./utils/db";
import authRoutes from "./routes/authRoutes";
import sweetsRoutes from "./routes/sweetsRoutes";

const app = express();

const API_PREFIX = "/api/v1";

app.use(cors());
app.use(express.json());

// for postgress
// db.authenticate().then(() => console.log("DB connected"));

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API is running" });
});

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/sweets`, sweetsRoutes);

/**
 * Any uncaught error thrown in controllers or middleware
 * will be caught here to prevent server crashes.
 */
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Unhandled Error:", err);
  return res.status(500).json({
    error: "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
