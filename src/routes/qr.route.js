import express from "express";
import { generateDynamicQRCode, trackEvent, updateDynamicQRCode } from "../controllers/qr.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateDynamicQRCode);
router.put("/:id/update", authMiddleware, updateDynamicQRCode);
router.post("/:id/track", trackEvent);

export default router;
