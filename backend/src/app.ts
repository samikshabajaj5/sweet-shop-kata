import express from "express";
import cors from "cors";
import db from "./utils/db";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

db.authenticate().then(() => console.log("DB connected"));

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API is running" });
});

app.use("/api/auth", authRoutes);

export default app;
