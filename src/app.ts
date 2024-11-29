import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDatabase } from "./database";
import { PORT } from "./config";
import errorMiddleware from "./middlewares/errorHandler.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../src/utils/swagger";
import authRoutes from "./routes/auth.route";
import qrRoutes from "./routes/qr.route";
import analyticsRoutes from "./routes/analytics.route";

// Initialize Express app
const app = express();

// Middlewares
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse incoming JSON requests

// Swagger API Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/qr", qrRoutes); // QR Code routes
app.use("/api/analytics", analyticsRoutes); // Analytics routes

// Home route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the QR Code Management API!");
});

// Error handling middleware
app.use(errorMiddleware);

// Connect to MongoDB and start the server
connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error: Error) => {
  console.error("Failed to connect to database", error);
});
