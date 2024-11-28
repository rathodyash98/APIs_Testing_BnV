import express, { Request, Response, NextFunction } from "express";
import {
  generateDynamicQRCode,
  generateStaticQRCode,
  getMyQRCodes,
  trackEvent,
  updateDynamicQRCode,
} from "../controllers/qr.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

// Route to generate dynamic QR code
router.post("/generate", authMiddleware, generateDynamicQRCode);

// Route to update a dynamic QR code
router.put("/:id/update", authMiddleware, updateDynamicQRCode);

// Route to track an event for a QR code
router.post("/:id/track", trackEvent);

// Route to generate static QR code
router.post("/generate-static", authMiddleware, generateStaticQRCode);

// Route to get all QR codes for the current user
router.get("/my-codes", authMiddleware, getMyQRCodes);

export default router;
