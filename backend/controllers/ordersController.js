
const db = require('../models/orderModel');


const calculateDiscount = (quantity, pricePerUnit) => {
    let totalAmount = quantity * pricePerUnit;
    let discount = 0;

    if (totalAmount > 10000) {
        // give 10% discount if amount greater than 10000
        discount += totalAmount * 0.1; 
    }

    // additional  ₹500 discount if quantity greater than 5
    if (quantity > 5 && totalAmount > 10000) {
        discount += 500; 
    }

    return {
        totalAmount,
        discount,
        finalAmount: totalAmount - discount,
    };
};

//to generate unique id ,there are other methods to generate unique id's also 
//but i used this for simplicity
const generateOrderID = () => {
    return db.nextOrderID++;
};

const controllers = {
    placeOrder: (req, res) => {
        const { productName, quantity, customerName } = req.body;

        // Input validation
        if (!productName) {
            return res.status(400).json({ error: 'Invalid input. Ensure productName is provided.' });
        }

        if ( !customerName ) {
            return res.status(400).json({ error: 'Invalid input. Ensure CustomerName is provided' });
        }
        if ( quantity <= 0) {
            return res.status(400).json({ error: 'Invalid input. Ensure quantity is valid' });
        }


        const product = db.products.find(p => p.productName === productName);
        //IF Product is not present in ProductList
        if (!product) {
            return res.status(404).json({ error: 'Product not found.' });
        }

        const { pricePerUnit } = product;

        //To calculate Discount
        const { totalAmount, discount, finalAmount } = calculateDiscount(quantity, pricePerUnit);

        //Place Order
        const newOrder = {
            orderID: generateOrderID(),
            customerName,
            productNames: productName,
            quantity,
            pricePerUnit,
            totalAmount,
            discount,
            orderAmount: finalAmount,
            timestamp: new Date().toISOString(),
        };
        
        //Push order in database
        db.orders.push(newOrder);

        //update Total Revenue in database
        db.account.totalRevenue += finalAmount;

        res.status(201).json(newOrder);
    },

    getOrderSummary: (req, res) => {
        const orderID = parseInt(req.params.id);

        const order = db.orders.find(o => o.orderID === orderID);
        
        //invalid orderID
        if (!order) {
            return res.status(404).json({ error: 'Order not found. please enter correct OrderID' });
        }

        res.json(order);
    },

    //To fetch Total Revenue
    calculateTotalRevenue: (req, res) => {
        res.json({ totalRevenue: db.account.totalRevenue });
    },
};

module.exports = controllers;
