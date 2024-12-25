# Bits Order Management System

This is a backend application to manage orders, calculate discounts, and track revenue. The project includes routes for creating orders, fetching order details, and calculating total revenue.

### Deployed Link:
You can access the live API at: [https://bits-order-mg.vercel.app/](https://bits-order-mg.vercel.app/)

---

## API Endpoints and Check all the endpoints in the Postman with these routes and example

### 1. **Base Route (GET /)**
- **Description:** This is the base route of the API that returns a simple hello message.
- **Method:** `GET`
- **URL:** `https://bits-order-mg.vercel.app/`
- **Response Example:**
  ```json
  {
    "message": "Hello World"
  }

### 2. **Create an Order (POST /orders)**
- **Description:** This is the base route of the API that returns the products details and place the order.
- **Method:** `POST`
- **URL:** `https://bits-order-mg.vercel.app/orders`
- **Body Example:**
  ```json
  {
  "productName": "Laptop",
  "quantity": 3,
  "pricePerUnit": 15000
}


### 3. **Get Order by ID (GET /orders/:id)**
- **Description:** This route fetches the details of a specific order by its id.
- **Method:** `GET`
- **URL:** `https://bits-order-mg.vercel.app/orders/:id`
- **Body Example:**
  ```json
  {
  "id": "3f0737b1-7b42-45c8-86a3-e6b7d6cc9d4c",
  "timestamp": "2024-12-25T12:00:00Z",
  "productName": "Laptop",
  "quantity": 3,
  "pricePerUnit": 15000,
  "totalAmount": 45000,
  "discount": 0,
  "finalAmount": 45000
}

### 3. **Get Total Revenue (GET /revenue))**
- **Description:** This route returns the total revenue from all orders placed so far.
- **Method:** `GET`
- **URL:** `https://bits-order-mg.vercel.app/revenue`
- **Response Example:**
  ```json
  {
  "totalRevenue": 45000
}

