import express from "express";
import cors from "cors";
import db from "./utils/db";

const app = express();

app.use(cors());
app.use(express.json());

db.authenticate().then(() => console.log("DB connected"));

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API is running" });
});

export default app;
