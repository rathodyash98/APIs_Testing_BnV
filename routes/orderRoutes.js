import express from 'express';
import { placeOrder, getOrderSummary } from '../controllers/orderController.js';

const router = express.Router();

// Place an Order
router.post('/', placeOrder);

// Get Order Summary by ID
router.get('/:id', getOrderSummary);

export default router;
