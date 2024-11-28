import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connectDatabase } from "../database.js";
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
import analyticsRoutes from "./src/routes/analyticsRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import qrRoutes from "./src/routes/qrRoutes.js";

// Initialize app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectDatabase();

// Routes
app.use("/auth", authRoutes);
app.use("/qr", qrRoutes);
app.use("/analytics", analyticsRoutes);

// Error Middleware
app.use(errorMiddleware);

export default app;
