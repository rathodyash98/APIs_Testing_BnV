import { Router } from "express";
import { addOrder, getOrderSummary, getTotalRevenue } from "../controllers/order.controller";

const router = Router()

router.post("/addOrder",addOrder)
router.get("/getOrderSummary/:orderId",getOrderSummary)
router.get("/getTotalRevenue",getTotalRevenue)

export default router;