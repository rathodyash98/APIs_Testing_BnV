const express = require("express");
const {
  placeOrder,
  getOrderSummary,
  calculateRevenue,
} = require("../controllers/orderController");

const router = express.Router();

// Route to calculate total revenue
router.get("/revenue", calculateRevenue);

// Route to place an order
router.post("/placeorder", placeOrder);

// Route to get order summary by ID
router.get("/:id", getOrderSummary);



module.exports = router;
