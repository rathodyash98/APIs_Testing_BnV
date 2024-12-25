const express = require('express');
const { v4: uuidv4 } = require('uuid');
const orders = require('../data/orderData');

const router = express.Router();

// Route to Place an Order
router.post('/orders', (req, res) => {
    const { productName, quantity, pricePerUnit } = req.body;

    // Validate input
    if (!productName || quantity <= 0 || pricePerUnit <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const totalAmount = quantity * pricePerUnit;
    let discount = 0;

    // Apply discount rules
    if (totalAmount > 10000) {
        discount += totalAmount * 0.1; // 10% discount
    }
    if (quantity > 5) {
        discount += 500; // ₹500 flat discount
    }

    const finalAmount = totalAmount - discount;

    // Create the order
    const order = {
        id: uuidv4(),
        productName,
        quantity,
        pricePerUnit,
        totalAmount,
        discount,
        finalAmount,
        timestamp: new Date(),
    };

    // Save to in-memory database
    orders.push(order);

    res.status(201).json({ message: 'Order placed successfully', order });
});

// Route to Get Order Summary by ID
router.get('/orders/:id', (req, res) => {
    const { id } = req.params;

    // Find the order by ID
    const order = orders.find((order) => order.id === id);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
});

// Route to Calculate Total Revenue
router.get('/revenue', (req, res) => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);

    res.json({ totalRevenue });
});

module.exports = router;
