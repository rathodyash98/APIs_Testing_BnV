// In-memory database
const db = {
    //Product List
    products: [
        { productName: 'Laptop', pricePerUnit: 2500 },
        { productName: 'Phone', pricePerUnit: 1500 },
        { productName: 'Tablet', pricePerUnit: 1000 },
    ],
    //To store OrderDetails
    orders: [],
    account: { totalRevenue: 0 },
    //To help Generate orderID
    nextOrderID: 1001,
};



module.exports = db;
