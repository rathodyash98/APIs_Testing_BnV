const express = require("express");
const app = express();

// Import the routes
const orders = require("./routes/orders");

// Middleware to parse JSON request bodies
app.use(express.json());

// Define port number
const PORT = 4000;

// Route setup
app.use("/orders", orders);

// Activate server
app.listen(PORT, () => {
  console.log("Server is running on port", PORT); // Log server activation
});
