import mongoose from "mongoose";
import { config } from "./config"; // Import config from the updated config.ts

export const connectDatabase = async (): Promise<void> => {
  try {
    // Ensure that the MONGO_URI is provided
    if (!config.MONGO_URI) {
      throw new Error("MongoDB URI is missing from environment variables");
    }

    await mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
