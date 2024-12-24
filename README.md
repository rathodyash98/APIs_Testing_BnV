# Order Management System

This is a simple backend application built with **Express.js** to simulate an **Order Management System**. It provides RESTful APIs for placing orders, retrieving order summaries, and calculating total revenue. The system dynamically applies discounts based on order conditions.

---

## Overview

### Features:
- **Place an Order**: Accepts product details (name, quantity, and price per unit) and calculates the total amount after applying applicable discounts.
- **Get Order Summary**: Fetch details of a specific order using its unique ID.
- **Calculate Total Revenue**: Retrieves the total revenue generated from all placed orders.
- **Dynamic Discounts**:
  - If the total order amount (`quantity × price`) exceeds ₹10,000, a 10% discount is applied.
  - If the quantity exceeds 5 items, an additional ₹500 flat discount is applied.

---

## Setup Instructions

### Prerequisites:
- Node.js installed on your system.

### Steps to Run:
1. Clone the repository:
   ```bash
   git clone https://github.com/piyush960/order-management-system.git
   ```
2. Install dependencies
    ```bash
    npm install
    ```
3. Start the application
    ```bash
    npm start
    ```
4. Server will go live on http://localhost:8080

## API Endpoints

### 1. **Place an Order**
- **Endpoint**: `POST /api/orders`
- **Description**: Place a new order and calculate the final amount with discounts.
- **Example Request**:
    ```json
    {
    "productName": "Smartphone",
    "quantity": 3,
    "pricePerUnit": 7000
    }
    ```
- **Example Response**:
    ```json
    {
    "id": 1,
    "productName": "Smartphone",
    "quantity": 3,
    "pricePerUnit": 7000,
    "totalAmount": 21000,
    "discount": 2100,
    "finalAmount": 18900,
    "timestamp": "2024-12-24T10:00:00Z"
    }
    ```

### 2. **Get Order Summary**
- **Endpoint**: `GET /api/orders/:id`
- **Description**: Fetch details of an order by its unique ID.

### 3. **Get All Orders**
- **Endpoint**: `GET /api/orders`
- **Description**: Retrieve a list of all orders placed.

### 4. **Calculate Total Revenue**
- **Endpoint**: `GET /api/total-revenue`
- **Description**: Retrieve the total revenue generated from all orders.
- **Example Response**:
    ```json
    {
    "total_orders": 5,
    "total_revenue": 124800
    }
    ```
