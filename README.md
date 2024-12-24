```markdown
# Order Management System

## Overview

This is a backend application designed to simulate an **Order Management System**. The application allows placing orders with dynamic discount logic, retrieving order summaries, and calculating the total revenue generated from all placed orders. 

The backend is built using **Node.js**, **Express.js**, and **MongoDB**. The application is structured with clear modularity, enabling easy extensions and maintenance.

## Core Functionality

The system provides the following core functionalities through a RESTful API:

1. **Place an Order**: Accepts order details (product name, quantity, and price per unit). Each order has a unique ID and timestamp.
2. **Get Order Summary**: Retrieve details of an order by its unique ID.
3. **Calculate Total Revenue**: Return the total revenue generated from all placed orders.

## Dynamic Discount Logic

- If the total order amount (quantity × price) exceeds ₹10,000, a **10% discount** is applied.
- If the order includes more than 5 items, an **additional ₹500 flat discount** is applied.
- The discounts are reflected in the stored order data and are included in the response of the **Order Summary** API.

## Technology Stack

- **Node.js**: JavaScript runtime for the backend.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing order data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **dotenv**: For environment variable management.
- **nodemon**: Development tool for automatic server restarts.

## Folder Structure

```bash
order-management-system/
├── src/
│   ├── controllers/
│   │   └── orderController.js       # API logic for handling orders
│   ├── models/
│   │   └── orderModel.js            # MongoDB schema and model for orders
│   ├── routes/
│   │   └── orderRoutes.js           # API routes for orders
│   ├── config/
│   │   └── db.js                    # Database connection configuration
│   ├── server.js                    # Server entry point
│   └── app.js                       # App setup and middleware
├── .env                             # Environment variables (MongoDB URI, etc.)
├── package.json                     # Project dependencies and scripts
└── README.md                        # Project documentation
```

## Setup and Usage

### 1. Clone the Repository

```bash
git clone https://github.com/ZyanHere/Order-MS.git
cd order-management-system
```

### 2. Install Dependencies

Install all required dependencies using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string. You can use **MongoDB Atlas** for a cloud database or run MongoDB locally.

### 4. Run the Application

#### For Development:

Start the application in development mode with automatic reloading:

```bash
npm run dev
```

#### For Production:

Start the application in production mode:

```bash
npm start
```

By default, the application will run on `http://localhost:5000`.

### 5. Test the API

You can test the following endpoints using **Postman**, **Insomnia**, or **cURL**.

#### **1. Place an Order**
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/orders`
- **Body (JSON)**:
  ```json
  {
    "productName": "Laptop",
    "quantity": 6,
    "pricePerUnit": 2000
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order placed successfully",
    "order": {
      "_id": "64c98e5c4f96b2a3445d34e9",
      "productName": "Laptop",
      "quantity": 6,
      "pricePerUnit": 2000,
      "orderAmount": 12000,
      "discount": 1700,
      "finalAmount": 10300,
      "createdAt": "2024-12-24T10:30:12.345Z",
      "updatedAt": "2024-12-24T10:30:12.345Z"
    }
  }
  ```

#### **2. Get Order Summary**
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/orders/:id`
  - Replace `:id` with the actual order ID.
- **Response**:
  ```json
  {
    "_id": "64c98e5c4f96b2a3445d34e9",
    "productName": "Laptop",
    "quantity": 6,
    "pricePerUnit": 2000,
    "orderAmount": 12000,
    "discount": 1700,
    "finalAmount": 10300,
    "createdAt": "2024-12-24T10:30:12.345Z",
    "updatedAt": "2024-12-24T10:30:12.345Z"
  }
  ```

#### **3. Calculate Total Revenue**
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/orders/revenue`
- **Response**:
  ```json
  {
    "totalRevenue": 10300
  }
  ```

---

## Notes

- **MongoDB Setup**:
  - If you're using **MongoDB Atlas**, create a free cluster and replace `your_mongodb_connection_string` in the `.env` file.
  - For local MongoDB, make sure it's running and accessible.

- **Validation**:
  - Input validation is implemented for the `quantity` and `pricePerUnit` to ensure no negative or zero values are accepted.

- **Error Handling**:
  - Proper error handling is in place to catch any issues during database operations or API processing.

## Future Enhancements

- Implement authentication and authorization for order management.
- Add pagination for order retrieval.
- Integrate with a payment gateway for real-world order processing.

---
