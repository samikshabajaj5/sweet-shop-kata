import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API is running" });
});

export default app;
