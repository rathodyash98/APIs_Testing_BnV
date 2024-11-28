import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

// Define the type for the payload, assuming it only includes an `id` field
interface Payload {
  id: string;
}

// Function to generate JWT token
export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

// Function to verify JWT token and return the decoded payload
export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, JWT_SECRET);
};
