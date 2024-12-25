import { orders } from '../data/orders.js';
import { calculateDiscount } from '../helpers/calculateDiscount.js';
import { v4 as uuidv4 } from 'uuid';

// Place an Order
export const placeOrder = (req, res) => {
  const { productName, quantity, pricePerUnit } = req.body;

  if (!productName || typeof quantity !== 'number' || typeof pricePerUnit !== 'number' ||
      quantity <= 0 || pricePerUnit <= 0) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const totalAmount = quantity * pricePerUnit;
  const discount = calculateDiscount(quantity, totalAmount);
  const finalAmount = totalAmount - discount;

  const order = {
    id: uuidv4(),
    timestamp: new Date(),
    productName,
    quantity,
    pricePerUnit,
    totalAmount,
    discount,
    finalAmount,
  };

  orders.push(order);

  res.status(201).json(order);
};


export const getOrderSummary = (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(order);
};


export const calculateRevenue = (req, res) => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);
  res.json({ totalRevenue });
};
