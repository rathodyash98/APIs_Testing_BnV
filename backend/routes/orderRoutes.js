const express = require('express');
const controllers = require('../controllers/ordersController');
const db = require('../models/orderModel');
const orderRoutes = express.Router();

//for product list  from database
orderRoutes.get('/products', (req, res) => {
    
    res.json(db.products); 
});

//for fetching orders from database
orderRoutes.get('/all-orders', (req, res) => {
    
    res.json(db.orders); 
});


orderRoutes.post('/place-order', controllers.placeOrder);
orderRoutes.get('/order-summary/:id', controllers.getOrderSummary);
orderRoutes.get('/total-revenue', controllers.calculateTotalRevenue);

module.exports = orderRoutes;
