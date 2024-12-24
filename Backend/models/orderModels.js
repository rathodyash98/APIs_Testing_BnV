const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product", // Reference to the Product model
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  totalRevenue:{
    type:Number,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  totalPrice:{
    type:Number,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
