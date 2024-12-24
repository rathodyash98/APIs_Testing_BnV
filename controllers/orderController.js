const { v4: uuidv4 } = require("uuid");
const orders = require("../config/database"); // Reference the orders array from database.js

// Helper function to calculate total and discounts
const calculateDiscountedTotal = (quantity, price) => {
  let total = quantity * price;
  let discount = 0;

  // Apply discount logic
  if (total > 10000) {
    discount += total * 0.1; // 10% discount
  }
  if (quantity > 5) {
    discount += 500; // ₹500 flat discount
  }

  return { total, discount, finalTotal: total - discount };
};

// Place an Order
exports.placeOrder = (req, res) => {
  const { productName, quantity, pricePerUnit } = req.body;

  // Validate inputs
  if (!productName || quantity <= 0 || pricePerUnit <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { total, discount, finalTotal } = calculateDiscountedTotal(
    quantity,
    pricePerUnit
  );

  const newOrder = {
    id: uuidv4(),
    productName,
    quantity,
    pricePerUnit,
    total,
    discount,
    finalTotal,
    timestamp: new Date(),
  };

  orders.push(newOrder);

  res.status(201).json({
    message: "Order placed successfully",
    newOrder,
  });
};

// Get Order Summary
exports.getOrderSummary = (req, res) => {
  const { id } = req.params;
  const order = orders.find((order) => order.id === id);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
};

// Calculate Total Revenue
exports.calculateRevenue = (req, res) => {
  if (orders.length === 0) {
    return res.status(404).json({ error: "No orders found yet" });
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.finalTotal, 0);

  res.json({ totalRevenue });
};
