import dotenv from "dotenv";
dotenv.config();

// Define types for environment variables
interface Config {
  PORT: string | number;
  MONGO_URI: string | undefined;
  JWT_SECRET: string;
}

// Extract values from process.env with proper typing
export const config: Config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
};
