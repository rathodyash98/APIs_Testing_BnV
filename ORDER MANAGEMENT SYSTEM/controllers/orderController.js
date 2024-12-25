const orders = require('../models/orderModel');
const { validateOrder } = require('../utils/validatins');

let orderIdCounter = 1;

const placeOrder = (req, res) => {
    const { productName, quantity, pricePerUnit } = req.body;

    console.log("Placing order. Incoming data:", { productName, quantity, pricePerUnit });

    const validationError = validateOrder(quantity, pricePerUnit);
    if (validationError) return res.status(400).json({ error: validationError });

    let orderAmount = quantity * pricePerUnit;
    let discount = 0;

    if (orderAmount > 10000) discount += orderAmount * 0.1;
    if (quantity > 5) discount += 500;

    orderAmount -= discount;

    const order = {
        id: orderIdCounter++,
        productName,
        quantity,
        pricePerUnit,
        orderAmount,
        discount,
        timestamp: new Date(),
    };

    console.log("Orders before push:", orders);
    orders.push(order);
    console.log("Orders after push:", orders);

    res.status(201).json(order);
};



const getOrderSummary = (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(o => o.id === orderId);

    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json(order);
};



const calculateTotalRevenue = (req, res) => {
    console.log("Orders at revenue calculation:", orders);

    if (!orders || orders.length === 0) {
        return res.status(404).json({ error: 'No orders found' });
    }

    const totalRevenue = orders.reduce((sum, order) => sum + order.orderAmount, 0);
    console.log("Total revenue:", totalRevenue);

    res.json({ totalRevenue });
};

module.exports = { placeOrder, getOrderSummary, calculateTotalRevenue };
