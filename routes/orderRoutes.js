const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/order', orderController.placeOrder);
router.get('/orders/:id', orderController.getOrderSummary);
router.get('/revenue', orderController.calculateTotalRevenue);

module.exports = router;
