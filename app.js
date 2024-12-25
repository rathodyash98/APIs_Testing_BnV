import express from 'express';
import orderRoutes from './routes/orderRoutes.js';
import revenueRoutes from './routes/revenueRoutes.js';
import dotenv from 'dotenv';
const app = express();

dotenv.config();
// Middleware
app.use(express.json());
const port = process.env.PORT || 3000;
// Routes
app.get('/', (req, res) => {
  res.send('Order Management Application');
});
app.use('/orders', orderRoutes);
app.use('/revenue', revenueRoutes);


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
