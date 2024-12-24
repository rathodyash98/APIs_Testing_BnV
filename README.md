# Order Management System

## Objective

Build a backend application that simulates an Order Management System with dynamic discount logic.

## Requirements

1. **Core Functionality**:

   - **Place an Order**: Accept order details (product name, quantity, and price per unit). Each order should have a unique ID and timestamp.
   - **Get Order Summary**: Retrieve details of an order by its unique ID.
   - **Calculate Total Revenue**: Return the total revenue generated from all placed orders.

2. **Dynamic Logic**:

   - **Discount Rules**:
     - If the total order amount (quantity × price) exceeds ₹10,000, apply a 10% discount.
     - If the order includes more than 5 items, apply an additional ₹500 flat discount.
   - Ensure the discounts reflect in the stored order data and the Order Summary API response.

3. **Additional Constraints**:
   - Use JavaScript/TypeScript along with Express.js.
   - Use an in-memory database (e.g., an array) for storing order data.
   - Validate all inputs (e.g., no negative quantities or prices).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/order-management-system.git
   cd order-management-system
   ```

## Project Structure

order-management-system/
├── config/
│ └── database.js
├── controllers/
│ └── orderController.js
├── routes/
│ └── orders.js
├── package.json
└── README.md

## API Endpoints:-

# Place an Order:

URL: orders/placeorder
Method: POST
Body:{
"productName": "laptop",
"quantity": 5,
"pricePerUnit": 50000
}

Response:{
"message": "Order placed successfully",
"newOrder": {
"id": "839de574-032c-4e18-a02d-78b5eaa5800d",
"productName": "laptop",
"quantity": 5,
"pricePerUnit": 50000,
"total": 250000,
"discount": 25000,
"finalTotal": 225000,
"timestamp": "2024-12-24T08:10:17.871Z"
}
}

# Get Order Summary:

URL: orders/:id
Method: GET

Response:{
"id": "839de574-032c-4e18-a02d-78b5eaa5800d",
"productName": "laptop",
"quantity": 5,
"pricePerUnit": 50000,
"total": 250000,
"discount": 25000,
"finalTotal": 225000,
"timestamp": "2024-12-24T08:10:17.871Z"
}

# Calculate Total Revenue:

URL: orders/revenue
Method: GET

Response:{
"totalRevenue": 225000
}
