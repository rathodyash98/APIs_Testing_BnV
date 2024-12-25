# Order Management System Backend

## Overview
- Order management system is a simple backend application using ExpressJs and TypeScript.
- User can place order, get order summary using the orderId and get the total revenue generated

## Setup and Usage
### Pre-requisites
- NodeJs
- npm

### Steps to run
- Clone the repository
```bash
https://github.com/Rutvikraut/order-management-backend.git

cd order-management-backend
```
- Install Dependencies

```bash
npm install
```

- Start the server

```bash
npm run dev
```

### Sample Inputs

#### POST ( /api/addOrder )

- Request

```json
{
  "productName": "Bag",
  "quantity": 10,
  "pricePerUnit": 1200
}
```

- Response

```json
{
    "message": "Order Placed Successfully",
    "data": {
        "id": "118921ea-1381-4c51-ae60-c626b629c456",
        "productName": "Bag",
        "quantity": 10,
        "pricePerUnit": 1200,
        "totalAmount": 12000,
        "discount": 1700,
        "finalAmount": 10300,
        "timestamp": "2024-12-25T09:19:19.207Z"
    }
}
```

#### GET ( /api/getOrderSummary/:orderId )

```json
{
    "message": "Order Found",
    "data": {
        "id": "118921ea-1381-4c51-ae60-c626b629c456",
        "productName": "Bag",
        "quantity": 10,
        "pricePerUnit": 1200,
        "totalAmount": 12000,
        "discount": 1700,
        "finalAmount": 10300,
        "timestamp": "2024-12-25T09:19:19.207Z"
    }
}
```

#### GET ( /api/getTotalRevenue )

```json
{
    "message": "Total revenue calculated",
    "data": 10300
}
```
