import OrderModel from "../models/order.model";

// Controller to place an order
export const placeOrder = async (req, res) => {
  try {
    const { productName, quantity, pricePerUnit } = req.body;

    // Input validation
    if (!productName || quantity <= 0 || pricePerUnit <= 0) {
      return res.status(400).json({
        message: "Invalid input. Ensure productName, quantity > 0, and pricePerUnit > 0.",
      });
    }

    // Calculate the order amount
    const orderAmount = quantity * pricePerUnit;
    let discount = 0;

    // Apply discounts based on rules
    if (orderAmount > 10000) {
      discount += orderAmount * 0.1; // 10% discount for orders over ₹10,000
    }
    if (quantity > 5) {
      discount += 500; // Additional ₹500 discount for orders with more than 5 items
    }

    // Calculate the final amount after discounts
    const finalAmount = orderAmount - discount;

    // Create a new order instance
    const newOrder = new OrderModel({
      productName,
      quantity,
      pricePerUnit,
      orderAmount,
      discount,
      finalAmount,
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with the created order
    return res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Failed to place the order" });
  }
};

// Controller to retrieve an order summary by ID
export const getOrderSummary = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the order by its ID
    const order = await OrderModel.findById(id);

    // If the order is not found, return a 404 error
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Respond with the order details
    return res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order summary:", error);
    return res.status(500).json({ message: "Failed to retrieve the order" });
  }
};

// Controller to calculate the total revenue
export const calculateTotalRevenue = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await OrderModel.find();

    // Sum up the finalAmount of all orders
    const totalRevenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);

    // Respond with the total revenue
    return res.status(200).json({ totalRevenue });
  } catch (error) {
    console.error("Error calculating total revenue:", error);
    return res.status(500).json({ message: "Failed to calculate total revenue" });
  }
};
