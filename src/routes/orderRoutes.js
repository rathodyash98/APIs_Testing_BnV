import express from 'express';
import { createOrder, getOrder, getRevenue } from '../controllers/orderController.js';

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/:id', getOrder);
router.get('/revenue', getRevenue);

export default router;