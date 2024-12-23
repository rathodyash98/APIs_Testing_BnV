
# Order Management System

## Overview
The **Order Management System** is a backend application built with **Node.js** and **Express.js** that simulates an order management workflow. It allows users to place orders, retrieve order summaries, and calculate total revenue. The system also includes dynamic discount logic to handle various pricing rules.

### Key Features
1. **Place an Order**: 
   - Create an order with product name, quantity, and price per unit. 
   - Each order is assigned a unique ID and timestamp.
2. **Get Order Summary**: 
   - Retrieve detailed information about a specific order using its unique ID.
3. **Calculate Total Revenue**: 
   - Return the total revenue generated from all placed orders, accounting for discounts.
4. **Dynamic Discounts**: 
   - 10% discount for orders exceeding ₹10,000.
   - Flat ₹500 discount for orders with more than 5 items.


## Technologies Used
- **Node.js**: JavaScript runtime environment for building scalable applications.
- **Express.js**: Minimal and flexible Node.js web application framework.
- **JavaScript**: Used to implement business logic and API functionality.
- **In-Memory Database**: Orders are stored in an array for simplicity.


## Setup and Usage Instructions

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

### Steps to Run the Application
1. Clone the repository:
   ```bash
   git clone https://github.com/DrMyth/order-management-system.git
   cd order-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm run dev
   ```
   The server will start running at **http://localhost:3000**.

4. Use tools like **Postman** or **cURL** to test the APIs.


## API Endpoints

### 1. **Place an Order**
   - **Endpoint**: `POST /api/orders`
   - **Description**: Place a new order with product details.
   - **Request Body**:
     ```json
     {
       "productName": "Laptop",
       "quantity": 3,
       "pricePerUnit": 30000
     }
     ```
   - **Response**:
     ```json
     {
       "orderId": "ORD-1734941260976",
       "timestamp": "2024-12-23T12:34:56Z",
       "productName": "Laptop",
       "quantity": 3,
       "pricePerUnit": 30000,
       "totalAmount": 90000,
       "discountApplied": 9000,
       "finalAmount": 81000
     }
     ```

---

### 2. **Get Order Summary**
   - **Endpoint**: `GET /api/orders/:orderId`
   - **Description**: Retrieve details of an order by its unique ID.
   - **Sample Response**:
     ```json
     {
       "orderId": "ORD-1734941260976",
       "timestamp": "2024-12-23T12:34:56Z",
       "productName": "Laptop",
       "quantity": 3,
       "pricePerUnit": 30000,
       "totalAmount": 90000,
       "discountApplied": 9000,
       "finalAmount": 81000
     }
     ```

---

### 3. **Calculate Total Revenue**
   - **Endpoint**: `GET /api/revenue`
   - **Description**: Retrieve the total revenue generated from all orders.
   - **Sample Response**:
     ```json
     {
       "totalRevenue": 58720
     }
     ```

---

## Discount Logic: How Discounts Are Applied

1. **10% Discount Rule**:
   - If the total order amount (`quantity × pricePerUnit`) exceeds ₹10,000, a 10% discount is applied.
2. **Flat ₹500 Discount Rule**:
   - If the order includes more than 5 items, an additional ₹500 discount is applied.

### Example
#### Input:
```json
{
  "productName": "Mobile Phone",
  "quantity": 7,
  "pricePerUnit": 2000
}
```
#### Calculation:
- Total Order Amount: `7 × 2000 = ₹14,000`
- 10% Discount: `₹14,000 × 0.10 = ₹1,400`
- Flat Discount: `₹500`
- **Final Amount**: `₹14,000 - ₹1,400 - ₹500 = ₹12,100`

#### Output:
```json
{
  "orderId": "56789",
  "timestamp": "2024-12-23T13:45:12Z",
  "productName": "Mobile Phone",
  "quantity": 7,
  "pricePerUnit": 2000,
  "totalAmount": 14000,
  "discountApplied": 1900,
  "finalAmount": 12100
}
```
