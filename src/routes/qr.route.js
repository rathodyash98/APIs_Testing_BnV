import express from "express";
import { generateDynamicQRCode, generateStaticQRCode, getMyQRCodes, trackEvent, updateDynamicQRCode } from "../controllers/qr.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateDynamicQRCode);
router.put("/:id/update", authMiddleware, updateDynamicQRCode);
router.post("/:id/track", trackEvent);
router.post("/generate-static", authMiddleware, generateStaticQRCode);
router.get("/my-codes", authMiddleware, getMyQRCodes);

export default router;
