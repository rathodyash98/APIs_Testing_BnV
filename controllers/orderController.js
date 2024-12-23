const orders = require("../models/orderModel");

const generateOrderId = () => {
  return "ORD-" + Date.now();
};

exports.placeOrder = (req, res) => {
  const { productName, quantity, pricePerUnit } = req.body;

  if (!productName || quantity <= 0 || pricePerUnit <= 0) {
    return res
      .status(400)
      .json({ error: "Invalid input. Check quantity and price." });
  }

  const orderId = generateOrderId();
  const timestamp = new Date();

  let totalAmt = quantity * pricePerUnit;
  let discount = 0;

  if (totalAmt > 10000) {
    discount += totalAmt * 0.1;
  }
  
  if (quantity > 5) {
    discount += 500;
  }

  const finalAmt = totalAmt - discount;

  const order = {
    orderId,
    timestamp,
    productName,
    quantity,
    pricePerUnit,
    totalAmt,
    discount,
    finalAmt,
  };

  orders.push(order);
  console.log(orders);

  res.status(201).json({ message: "Order placed successfully", order });
};

exports.getOrderSummary = (req, res) => {
  const { id } = req.params;

  const order = orders.find((o) => o.orderId === id);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.status(200).json(order);
};

exports.calculateTotalRevenue = (req, res) => {
  let totalRevenue = 0;
  orders.forEach((order) => {
    totalRevenue += order.finalAmt;
  });
  res.status(200).json({ totalRevenue });
};
