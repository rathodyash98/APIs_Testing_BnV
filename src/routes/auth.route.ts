import express, { Request, Response, NextFunction } from "express";
import { login, getUserDetails } from "../../controllers/auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

// Route for user login
router.post("/login", login);

// Route to get current user details
router.get("/me", authMiddleware, getUserDetails);

export default router;
