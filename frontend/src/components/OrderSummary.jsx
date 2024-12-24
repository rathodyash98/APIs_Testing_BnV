import React, { useState } from "react";
import { getOrderSummary } from "../api";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const [orderID, setOrderID] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  const handleGetOrderSummary = async () => {
    if (orderID.trim() === "" || orderID < 0) {
      toast.error("Please enter a valid Order ID");
      setOrderDetails("Please enter a valid Order ID.");
      return;
    }
    try {
      const orderDetail = await getOrderSummary(orderID);
      if (orderDetail.error) {
        toast.error("Please enter a valid Order ID");
        setOrderDetails("Please enter a valid Order ID.");
      } else {
        setOrderDetails(orderDetail);
      }
    } catch (error) {
      toast.error("Failed to fetch order summary. Try again.");
      setOrderDetails("Failed to fetch order summary.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <h2 className="text-2xl font-bold text-center h-10 mb-6 bg-[#1ab79d] text-white">
        Order Details
      </h2>
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderID}
          onChange={(e) => setOrderID(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={handleGetOrderSummary}
          className="ml-4 px-5 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-black transition"
        >
          Get Details
        </button>
      </div>
      {orderDetails && (
        <div className="bg-gray-100 shadow-lg rounded-lg p-6">
          {typeof orderDetails === "string" ? (
            <p className="text-red-600 text-center font-medium">
              {orderDetails}
            </p>
          ) : (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-700 border-b pb-2 border-blue-200">
                Order Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                
                <div>
                  <p>
                    <span className="font-bold">Order ID:</span>{" "}
                    {orderDetails.orderID}
                  </p>
                  <p>
                    <span className="font-bold">Customer Name:</span>{" "}
                    {orderDetails.customerName}
                  </p>
                  <p>
                    <span className="font-bold">Product Name:</span>{" "}
                    {orderDetails.productNames}
                  </p>
                  <p>
                    <span className="font-bold">Quantity:</span>{" "}
                    {orderDetails.quantity}
                  </p>
                  <p>
                    <span className="font-bold">Price per Unit:</span> ₹
                    {orderDetails.pricePerUnit}
                  </p>
                </div>

                <div>
                  <p>
                    <span className="font-bold">Total Amount:</span> ₹
                    {orderDetails.totalAmount}
                  </p>
                  <p>
                    <span className="font-bold">Discount:</span> ₹
                    {orderDetails.discount}
                  </p>
                  <p>
                    <span className="font-bold">Order Amount:</span> ₹
                    {orderDetails.orderAmount}
                  </p>
                  <p>
                    <span className="font-bold">Timestamp:</span>{" "}
                    {new Date(orderDetails.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
