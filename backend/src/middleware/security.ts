import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { Express } from "express";

export const setupSecurity = (app: Express) => {
  // ---------------------------------------------
  // Helmet: secure HTTP headers
  // ---------------------------------------------
  app.use(
    helmet({
      contentSecurityPolicy: false, // keep simple for dev
      crossOriginEmbedderPolicy: false,
    }),
  );

  // ---------------------------------------------
  // Rate Limiting
  // ---------------------------------------------
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use(limiter);

  // ---------------------------------------------
  // CORS Hardening
  // ---------------------------------------------
  app.use(
    cors({
      origin: ["http://localhost:3001"], // frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  // ---------------------------------------------
  // Body Limits
  // ---------------------------------------------
  app.use(require("express").json({ limit: "5mb" }));
  app.use(require("express").urlencoded({ extended: true, limit: "5mb" }));
};
