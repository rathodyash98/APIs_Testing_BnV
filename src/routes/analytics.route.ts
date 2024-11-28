import express, { Request, Response, NextFunction } from "express";
import { getAnalytics, getTrackedEvents } from "../../controllers/analytics.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

// Route to get tracked events for a specific QR code by ID
router.get("/:id/events", authMiddleware, getTrackedEvents);

// Route to get analytics for a specific QR code by ID
router.get("/:id/analytics", authMiddleware, getAnalytics);

export default router;
