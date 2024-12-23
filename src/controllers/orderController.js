import { v4 as uuidv4 } from 'uuid';
import { calculateDiscount } from '../utils/discountCalculator.js';
import { orders } from '../models/orderModel.js';

export const createOrder = (req, res) => {
  const { productName, quantity, pricePerUnit } = req.body;

  if (!productName || quantity <= 0 || pricePerUnit <= 0) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const totalAmount = quantity * pricePerUnit;
  const discount = calculateDiscount(quantity, totalAmount);
  const finalAmount = totalAmount - discount;

  const order = {
    id: uuidv4(),
    productName,
    quantity,
    pricePerUnit,
    totalAmount,
    discount,
    finalAmount,
    timestamp: new Date()
  };

  orders.push(order);
  res.status(201).json(order);
};

export const getOrder = (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
};

export const getRevenue = (req, res) => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);
  res.json({ totalRevenue });
};