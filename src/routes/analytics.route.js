import express from "express";
import { getAnalytics, getTrackedEvents } from "../../controllers/analytics.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id/events", authMiddleware, getTrackedEvents);
router.get("/:id/analytics", authMiddleware, getAnalytics);

export default router;
