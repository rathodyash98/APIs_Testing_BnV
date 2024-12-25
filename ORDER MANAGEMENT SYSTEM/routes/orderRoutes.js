const express = require('express');
const { placeOrder, getOrderSummary, calculateTotalRevenue } = require('../controllers/orderController');

const router = express.Router();

router.post('/', placeOrder);
router.get('/revenue', calculateTotalRevenue);
router.get('/:id', getOrderSummary);

module.exports = router;
