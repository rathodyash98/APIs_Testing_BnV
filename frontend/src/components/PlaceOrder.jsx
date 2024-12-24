import React, { useState, useEffect } from "react";
import { placeOrder, getTotalRevenue, getProducts } from "../api";
import Select from "react-select";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [customerName, setCustomerName] = useState("");  
  const [responseMessage, setResponseMessage] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await getTotalRevenue();
        setTotalRevenue(response.totalRevenue);
      } catch (error) {
        console.error("Failed to fetch total revenue:", error);
      }
    };
    fetchRevenue();
  }, []);

  useEffect(() => {
    // fetch productlist from backend to select  the prduct from list
    const productList = async () => {
      try {
        const data = await getProducts();
        setProducts(data || []);
        console.log(data); 
      } catch (error) {
        console.log(error);
      }
    };
    productList();
  }, []);

  const handleProductSelection = (selectedOption) => {
    setProductName(selectedOption ? selectedOption.label : "");
  };

  const handlePlaceOrder = async () => {
    if (!customerName) {
      toast.error("Please enter Customer Name"); 
      return;
    }
    if (!productName  ) {
      toast.error("Please select a Product"); 
      return;
    }

    if (quantity <= 0) {
      toast.error("Please enter a Valid Quantity of Products."); 
      return;
    }

    const orderData = { productName, quantity, customerName };  
    try {
      const response = await placeOrder(orderData);
      setResponseMessage(`Order placed successfully! Order ID: ${response.orderID}`);

      // Update the total revenue after placing the order
      const updatedRevenue = await getTotalRevenue();
      setTotalRevenue(updatedRevenue.totalRevenue);
      toast.success(`Order placed successfully! Order ID: ${response.orderID}`);

      // Reset  fields
    setCustomerName("");
    setProductName("");
    setQuantity(0);
    } catch (error) {
      setResponseMessage("Failed to place order.");
      toast.error("Failed to place the order. Please try again.");
    }
  };

  
  const productOptions = products.map((product) => ({
    value: product.productName,
    label: product.productName,
  }));

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl bg-[#1ab79d] font-bold mb-6 pt-1 text-white h-10  text-center">Place an Order</h2>
      <div className="flex justify-between items-center">
        <div className="w-full mr-4">
        <label className="block text-gray-700 font-medium mb-2 ">Customer Name</label>
          <input
            type="text"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}  // Update customer name
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <label className="block text-gray-700 font-medium mb-2">Product Name</label>
          <Select
            options={productOptions}
            value={productName ? { label: productName, value: productName } : null}
            onChange={handleProductSelection}
            placeholder="Select a product..."
          />

          <label className="block text-gray-700 font-medium mb-2 mt-4">Quantity</label>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />

          

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-black transition"
          >
            Place Order
          </button>
          <p className="text-green-600 font-medium mt-4">{responseMessage}</p>
        </div>
        <div className="w-1/3 bg-blue-100 p-6 rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-2xl font-bold text-blue-700 mt-2">₹{totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
