import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
