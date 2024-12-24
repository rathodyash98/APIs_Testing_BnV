import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./routes/order.route.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use("/api", orderRoutes);

export default app;
