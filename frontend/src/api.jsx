const BASE_URL = "http://localhost:3000/api";

export const placeOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/orders/place-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

export const getOrderSummary = async (orderID) => {
  const orderDetails = await fetch(`${BASE_URL}/orders/order-summary/${orderID}`);
  return orderDetails.json();
};

export const getTotalRevenue = async () => {
  const totalRevenue = await fetch(`${BASE_URL}/orders/total-revenue`);
  return totalRevenue.json();
};

export const getProducts = async () => {
    const products = await fetch(`${BASE_URL}/orders/products`);
    return products.json();
}

export const getOrders = async () => {
    const orders = await fetch(`${BASE_URL}/orders/all-orders`);
    return orders.json();
}
