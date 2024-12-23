# Order Management System

A modular Node.js backend application for managing orders with dynamic discount rules.

## Project Structure
```
src/
├── config/         # Configuration and constants
├── controllers/    # Request handlers
├── models/         # Data models
├── routes/         # API routes
├── utils/         # Helper functions
└── index.js       # Application entry point
```

## Features

- Modular architecture with clear separation of concerns
- ES Modules for better code organization
- Dynamic discount calculation
- RESTful API endpoints
- In-memory data storage
- Docker support for easy deployment

## Setup

### Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

### Using Docker
1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. For production:
   ```bash
   docker build -t order-management .
   docker run -p 3000:3000 order-management
   ```

## API Endpoints

### Place Order
```http
POST /api/orders
Content-Type: application/json

{
  "productName": "Laptop",
  "quantity": 6,
  "pricePerUnit": 2000
}
```

### Get Order
```http
GET /api/orders/:id
```

### Get Total Revenue
```http
GET /api/revenue
```

## Discount Rules
- 10% off on orders above ₹10,000
- ₹500 flat discount for orders with more than 5 items