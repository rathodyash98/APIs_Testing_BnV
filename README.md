# Order Management System

## Overview
A simple backend application simulating an Order Management System with dynamic discount logic.

## Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install


Clone the repository:

git clone <repository_url>
cd order-management-system

Install dependencies:

npm instal

Start the server:

npm start

The server will start on http://localhost:3000.

Usage Instructions

Endpoints

1. Place an Order

URL: POST /api/orders

Description: Places a new order.

Request Body:

{
  "productName": "Laptop",
  "quantity": 6,
  "pricePerUnit": 2000
}

Response:

{
  "id": 1,
  "productName": "Laptop",
  "quantity": 6,
  "pricePerUnit": 2000,
  "orderAmount": 10700,
  "discount": 1300,
  "timestamp": "2024-12-23T10:20:30.000Z"
}

2. Retrieve Order Summary

URL: GET /api/orders/:id

Description: Retrieves the details of an order by its unique ID.

Example Request:

GET /api/orders/1

Response:

{
  "id": 1,
  "productName": "Laptop",
  "quantity": 6,
  "pricePerUnit": 2000,
  "orderAmount": 10700,
  "discount": 1300,
  "timestamp": "2024-12-23T10:20:30.000Z"
}

3. Calculate Total Revenue

URL: GET /api/orders/revenue

Description: Returns the total revenue generated from all placed orders.

Example Request:

GET /api/orders/revenue

Response:

{
  "totalRevenue": 10700
}


