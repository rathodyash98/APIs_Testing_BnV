import React, { useState, useEffect } from "react";
import { getOrders } from "../api";

const OrderList = () => {
  const [orderList, setOrderList] = useState([]);
  
 
  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrderList(response);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    
    fetchOrders();

    // pooling setup to keep updating the orderList
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); 

   
    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center bg-[#1ab79d] mb-6 h-10 text-white">Placed Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orderList.map((order) => (
          <div
            key={order.orderID}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 transform hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {order.orderID}</h3>
            <p className="text-sm text-gray-600 mb-2">Customer: {order.customerName}</p>
            <p className="text-lg text-blue-600 font-bold mb-2">Final Amount: ₹{order.orderAmount}</p>
            <p className="text-xs text-gray-500">Timestamp: {order.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
