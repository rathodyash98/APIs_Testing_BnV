Install Pkg

    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.3",
    "cookie-parser": "^1.4.7",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.7.3",
    "nodemailer": "^6.9.16",
    "nodemon": "^3.1.7",
    "validator": "^13.12.0"

server Start :-  nodemon server.js

 *****************  Authentication ************************
// User Register..
http://localhost:4000/api/v1/post/userregister

// Login
http://localhost:4000/api/v1/post/login

// Logout
http://localhost:4000/api/v1/get/logout


************************ User Routes ************************

// Get All User Details -- Admin..
http://localhost:4000/api/v1/get/admin/users

// Update Role 
http://localhost:4000/api/v1/put/admin/updaterole/676b33d0ee6ccece4e0ff5ff


********************** products **************************************

// add products -- admin
http://localhost:4000/api/v1/post/newproduct

// Get All Products
http://localhost:4000/api/v1/get/getAllProducts



************************** Order Routes **************************
// create new order
http://localhost:4000/api/v1//post/order/new

{
  "orderItems": [
    {
      "name": "Samsung Mobile",
      "price": 10000,
      "quantity": 5,
      "product":"676b2684a9635b4e219c5226"
    }
  ]
}

// Retrive Item By ID
http://localhost:4000/api/v1/get/order/676b2ac72d2236ab7b0e7182

// Get Total Reveneu
http://localhost:4000/api/v1/get/orders


  
1. orderItems is an array where each item has properties like price and quantity.
2. The reduce() function iterates through the array, adding the product of item.price and item.quantity for each item to the total.
3. The initial value of total is 0

  const itemTotalPrice = orderItems.reduce((total, item) => {
    return total + item.price * item.quantity; 
  }, 0);


1. totalQuantity is calculated using reduce() by summing the quantity of each item in the array.
2. discount is initialized to 0 and will be updated based on the discount rules.

  const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  let discount = 0;


1. Check if itemTotalPrice is ≥ 10000.
2. If true, calculate 10% of itemTotalPrice and add it to discount

  if (itemTotalPrice >= 10000) {
    discount += 0.1 * itemTotalPrice; // 10% discount for orders above ₹10,000
  }

1. Check if totalQuantity is ≥ 5.
2. If true, add 500 to discount

  if (totalQuantity >= 5) {
    discount += 500; // Additional ₹500 discount for orders with more than 5 items
  }

1. Subtract the discount (sum of all applicable discounts) from the itemTotalPrice.
  const totalPrice = itemTotalPrice - discount;
