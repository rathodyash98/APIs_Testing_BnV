import express from 'express';
import { placeOrder, getOrderSummary } from '../controllers/orderController.js';

const router = express.Router();


router.post('/', placeOrder);


router.get('/:id', getOrderSummary);

export default router;
