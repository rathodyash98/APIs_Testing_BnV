

## Overview

The Order Management System is a web-based application designed to help businesses efficiently manage their product orders, calculate applicable discounts, and track overall revenue. This system is built with a **frontend** using React.js and a **backend** using Express.js, connected to an in-memory database that stores product and order details.

### Key Features
- **Product Management**: The system supports a list of products, each with a name and price per unit. This list is easily accessible through the backend.
- **Order Placement**: Users can place orders for products by specifying the product name, quantity, and customer name. The system calculates the total amount for the order and applies any applicable discounts.
- **Discount Calculation**: Discounts are applied based on two main conditions:
  1. A 10% discount is given if the total amount of the order exceeds ₹10,000.
  2. An additional ₹500 discount is provided if the quantity of the product ordered is greater than 5 and the total order amount exceeds ₹10,000.
- **Order Details**: Once an order is placed, users can fetch a detailed order summary that includes the total amount, applied discount, and final amount.
- **Revenue Tracking**: The system maintains a running total of all revenue generated from orders. This total is updated whenever a new order is placed and is accessible via an endpoint.


### Backend Architecture

The backend is structured to handle product and order management efficiently:

- **Model**: The `orderModel.js` contains the data structure for products, orders, and the account’s total revenue. 
- **Controllers**: The `ordersController.js` contains the business logic for placing an order, calculating discounts, generating order IDs, and tracking revenue.
- **Routes**: The `orderRoutes.js` file contains the routing logic to handle various API requests such as adding orders, fetching product details, and viewing the total revenue.
- **In-memory Database**: The application uses an in-memory database (`db` object) to store product details, orders, and the account's total revenue. This allows for fast data retrieval but would need to be replaced with a persistent database for a production environment.

### Frontend Architecture

The frontend is developed using React.js and allows users to interact with the Order Management System. The UI includes the following features:
- Display of available products for order placement.
- A form to enter order details (product name, quantity, and customer name).
- A summary page to view the placed order, including the calculated discount and final order amount.
- An easy-to-navigate interface for both customers and business admins to access key information.
- The frontend communicates with the backend through HTTP requests (using Axios or Fetch API) to interact with the order management system.



### Technology Stack

- **Frontend**: React.js, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: In-memory storage (for simplicity, can be replaced with a real database like MongoDB or MySQL)


---




# Setup and Usage Instructions

## Prerequisites
- **Node.js** (version 16 or above)
- **npm** (bundled with Node.js)
- A modern web browser (e.g., Chrome, Firefox)

## Steps to Set Up and Run

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   - Backend:
     ```bash
     cd backend
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Run the Application**:
   - Start the Backend:
     ```bash
     cd ../backend
     npm start
     ```
     Backend runs at [http://localhost:3000](http://localhost:3000).
   - Start the Frontend:
     ```bash
     cd ../frontend
     npm run dev
     ```
     Frontend runs at [http://localhost:5173](http://localhost:5173).

4. **Test the Application**:
   - **Access the frontend at** [http://localhost:5173](http://localhost:5173).
   - **for  APIs testing using POSTMAN**:
     - `GET /api/orders/products` → Fetch product list.
     - `POST /api/orders/place-order` → Place an order.
       - Example Request for placing order:
         ```json
         {
           "productName": "Laptop",
           "quantity": 6,
           "customerName": "John Doe"
         }
         ```
       - Example Response:
         ```json
         {
           "orderID": 1001,
           "customerName": "John Doe",
           "productNames": "Laptop",
           "quantity": 6,
           "pricePerUnit": 2500,
           "totalAmount": 15000,
           "discount": 2000,
           "orderAmount": 13000,
           "timestamp": "2024-12-24T12:34:56.789Z"
         }
         ```
     - `GET /api/orders/order-summary/:id` → Fetch order by ID.
     - `GET /api/orders/total-revenue` → View total revenue.



## sample input/output
# Sample Input/Output for Discount Calculation

## Input:
- **Product**: Laptop  
- **Quantity**: 6  
- **Price per Unit**: ₹2500  

### Calculation:
- **Total Amount**: ₹15000 (calculated as 6 × ₹2500)  

### Discount Logic:
1. **10% Discount**: Applied because the total amount exceeds ₹10000.  
   - 10% of ₹15000 = ₹1500 discount  
2. **₹500 Discount**: Applied because the quantity is greater than 5 and the total amount exceeds ₹10000.  

## Output:
- **Total Amount**: ₹15000  
- **Discount**: ₹2000 (₹1500 + ₹500)  
- **Final Amount**: ₹13000 (after applying the discount)  

### Future Enhancements

- **Persistent Database**: Replace the in-memory database with a persistent database like MongoDB, MySQL, or PostgreSQL to store orders and products.
- **Authentication and Authorization**: Implement user authentication and authorization to manage access control for customers and admins.
- **Advanced Discounting**: Add more complex discount rules, such as seasonal discounts, bundle offers, or promotional codes.
- **User Interface**: Improve the frontend with more interactive features, such as order history, status updates, and email notifications.
- **Deployment**: Deploy the application to cloud platforms like Heroku, AWS, or DigitalOcean to make it publicly accessible.
---
