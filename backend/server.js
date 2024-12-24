const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');

// Initialize app
const app = express();
const port = 3000;

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // Your frontend origin
}));

// Middleware
app.use(bodyParser.json());

// Apply routes
app.use('/api/orders', orderRoutes);

// Start server
app.listen(port, () => {
    console.log(`Order Management System running at http://localhost:${port}`);
});

// // Import required modules
// const express = require('express');
// const bodyParser = require('body-parser');
// const { v4: uuidv4 } = require('uuid');
// const cors = require("cors");

// // Initialize app
// const app = express();
// const port = 3000;
// // Enable CORS
// app.use(cors({
//     origin: "http://localhost:5173", // Your frontend origin
//   }));
// // Middleware
// app.use(bodyParser.json());

// // Models
// class Order {
//     constructor(productNames,customerName, quantity, pricePerUnit,totalAmount,discount, orderAmount, timestamp) {
//         this.orderID = uuidv4();
//         this.customerName = customerName;
//         this.productNames = productNames;
//         this.quantity = quantity;
//         this.pricePerUnit = pricePerUnit;
//         this.totalAmount = totalAmount;
//         this.discount = discount;
//         this.orderAmount = orderAmount;
//         this.timestamp = timestamp;
//     }
// }

// // In-memory database
// const db = {
//     products: [
//         { productName: 'Laptop', pricePerUnit: 2000 },
//         { productName: 'Phone', pricePerUnit: 1500 },
//         { productName: 'Tablet', pricePerUnit: 1000 },
//     ],
//     orders: [],
//     account: { totalRevenue: 0 },
// };

// // Helper function
// const calculateDiscount = (quantity, pricePerUnit) => {
//     let totalAmount = quantity * pricePerUnit;
//     let discount = 0;

//     if (totalAmount > 10000) {
//         discount += totalAmount * 0.1; // 10% discount
//     }

//     if (quantity > 5) {
//         discount += 500; // Flat ₹500 discount
//     }

//     return {
//         totalAmount:totalAmount,
//         discount:discount,
//         finalAmount: totalAmount - discount,
//     };
// };

// // Controllers
// // Controllers
// const controllers = {
//     placeOrder: (req, res) => {
//         const { productName, quantity ,customerName} = req.body;

//         // Input validation
//         if (!productName || !customerName || quantity <= 0) {
//             return res.status(400).json({ error: 'Invalid input. Ensure productName is provided and quantity is positive.' });
//         }

        

//         const product = db.products.find(p => p.productName === productName);
//         if (!product) {
//             return res.status(404).json({ error: 'Product not found.' });
//         }

//         const { pricePerUnit } = product;
//         const { totalAmount, discount, finalAmount } = calculateDiscount(quantity, pricePerUnit);

//         const newOrder = new Order(productName,customerName, quantity, pricePerUnit, totalAmount, discount, finalAmount, new Date().toISOString());
//         db.orders.push(newOrder);

//         db.account.totalRevenue += finalAmount;
//         res.status(201).json(newOrder);
//     },

//     getOrderSummary: (req, res) => {
//         const orderID = req.params.id;
//         const order = db.orders.find(o => o.orderID === orderID);

//         if (!order) {
//             return res.status(404).json({ error: 'Order not found.' });
//         }

//         res.json(order);
//     },

//     calculateTotalRevenue: (req, res) => {
//         res.json({ totalRevenue: db.account.totalRevenue });
//     },
// };

// // Routes
// const routes = {
//     orderRoutes: express.Router(),
// };

// routes.orderRoutes.get('/products', (req, res) => {
//     res.json(db.products); // Sends the list of products from the in-memory database
//   });

// routes.orderRoutes.get('/all-order', (req, res) => {
//     res.json(db.orders); // Sends the list of products from the in-memory database
//   });
  
// routes.orderRoutes.post('/place-order', controllers.placeOrder,calculateDiscount);
// routes.orderRoutes.get('/order-summary/:id', controllers.getOrderSummary);
// routes.orderRoutes.get('/total-revenue', controllers.calculateTotalRevenue);

// // Apply routes
// app.use('/api/orders', routes.orderRoutes);

// // Start server
// app.listen(port, () => {
//     console.log(`Order Management System running at http://localhost:${port}`);
// });
