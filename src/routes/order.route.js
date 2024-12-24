import express from "express";
import { calculateTotalRevenue, getOrderSummary, placeOrder } from "../controllers/order.controller";


const router = express.Router();

router.post("/orders", placeOrder);
router.get("/orders/:id", getOrderSummary);
router.get("/orders/revenue", calculateTotalRevenue);

export default router;
