import express from 'express';
import orderRoutes from './routes/orderRoutes.js';
import { PORT } from './config/constants.js';

const app = express();
app.use(express.json());

// Routes
app.use('/api', orderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));