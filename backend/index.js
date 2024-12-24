const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');


const app = express();
const port = 3000;


app.use(cors({
    origin: "http://localhost:5173", 
}));


app.use(bodyParser.json());


app.use('/api/orders', orderRoutes);


app.listen(port, () => {
    console.log(`Order Management System running at http://localhost:${port}`);
});

