import express from "express";
import cors from "cors";
import db from "./utils/db";
import authRoutes from "./routes/authRoutes";
import sweetsRoutes from "./routes/sweetsRoutes";
import { AppError } from "./errors/AppError";
import { loggingMiddleware } from "./middleware/loggingMiddleware";
import { responseLogger } from "./middleware/responseLogger";

const app = express();

const API_PREFIX = "/api/v1";

app.use(loggingMiddleware);
app.use(responseLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  console.error("Global Error:", err);

  // For AppError instances, use their statusCode and message
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
  }

  // Unknown or programming errors → 500
  return res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
});
export default app;
