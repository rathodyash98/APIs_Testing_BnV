import express from 'express';
import { calculateRevenue } from '../controllers/orderController.js';

const router = express.Router();


router.get('/', calculateRevenue);

export default router;
