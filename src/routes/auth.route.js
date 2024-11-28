import express from "express";
import { login } from "../../controllers/auth.controller.js";
import { getUserDetails } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", authMiddleware, getUserDetails);

export default router;
