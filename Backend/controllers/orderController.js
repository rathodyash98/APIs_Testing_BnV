const Order = require("../models/orderModels");
const Product = require("../models/productModels");
const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../middleware/tryCatch");


// Create New Order ..
exports.newOrder = tryCatchError(async (req, res, next) => {
  const { orderItems } = req.body;

  // Validate order items
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    return next(new ErrorHandler("Order items are required", 400));
  }

  // Calculate the total price based on item price, quantity
  const itemTotalPrice = orderItems.reduce((total, item) => {
    return total + item.price * item.quantity; 
  }, 0);

  // Calculate discounts
  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  let discount = 0;

  if (itemTotalPrice >= 10000) {
    discount += 0.1 * itemTotalPrice; // 10% discount for orders above ₹10,000
  }

  if (totalQuantity >= 5) {
    discount += 500; // Additional ₹500 discount for orders with more than 5 items
  }

  const totalPrice = itemTotalPrice - discount;

  const order = await Order.create({
    orderItems,
    user: req.user._id,
    itemPrice: itemTotalPrice,
    discountAmount: discount,
    totalPrice,
    paidAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Retrive order by unique ID..
exports.getSingleOrder = tryCatchError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get All orders and totalRevenue-- Admin..
exports.getAllOrders = tryCatchError(async (req, res, next) => {
  const orders = await Order.find();

  let totalRevenue = 0;

  orders.forEach((order) => {
    const itemPrice = order.orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ); 
    const discount = order.discountAmount || 0;

    totalRevenue += itemPrice - discount;
  });
  res.status(200).json({
    success: true,
    totalRevenue, 
    orders,
  });
});

