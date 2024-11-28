import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const generateToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

export const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
