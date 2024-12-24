import React from "react";
import PlaceOrder from "./components/PlaceOrder.jsx";
import OrderSummary from "./components/OrderSummary.jsx";
import OrderList from "./components/OrdersList.jsx";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="min-h-screen mx-8 bg-gray-50 w-full p-6 flex flex-col items-center">
      
      <div className="font-bold w-full h-12 text-4xl bg-[#1ab79d] pd-2 text-white text-center mb-10">
        Order Management System
      </div>
      
      <Toaster />
      
      
      <div className="w-full flex flex-row justify-between gap-8">
        
        <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Place a New Order</h2>
          <PlaceOrder />
        </div>

        
        <div className="w-1/2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h2>
          <OrderSummary />
        </div>
      </div>

      
      <div className="w-full mt-10">
        <OrderList />
      </div>
    </div>
  );
};

export default App;
