import express from "express";
import cors from "cors";
import db from "./utils/db";
import authRoutes from "./routes/authRoutes";
import sweetsRoutes from "./routes/sweetsRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// for postgress
// db.authenticate().then(() => console.log("DB connected"));

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetsRoutes);

export default app;
