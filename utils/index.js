
let orders = [
    {
        id: 1,
        product_name: "Smartphone",
        quantity: 3,
        price_per_unit: 7000,
        total_amount: 21000,
        discount: 2100,
        timestamp: new Date("2024-12-23T10:30:00Z")
    },
    {
        id: 2,
        product_name: "Headphones",
        quantity: 10,
        price_per_unit: 1500,
        total_amount: 15000,
        discount: 2000,
        timestamp: new Date("2024-12-23T11:00:00Z")
    },
    {
        id: 3,
        product_name: "Laptop",
        quantity: 2,
        price_per_unit: 45000,
        total_amount: 90000,
        discount: 9000,
        timestamp: new Date("2024-12-23T12:00:00Z")
    },
    {
        id: 4,
        product_name: "Gaming Console",
        quantity: 1,
        price_per_unit: 4000,
        total_amount: 4000,
        discount: 0,
        timestamp: new Date("2024-12-23T14:00:00Z")
    },
    {
        id: 5,
        product_name: "Keyboard",
        quantity: 7,
        price_per_unit: 1200,
        total_amount: 8400,
        discount: 500,
        timestamp: new Date("2024-12-23T15:00:00Z")
    }
];

const validate_order = (product_name, quantity, price_per_unit) => {
    return product_name && Number(quantity) > 0 && Number(price_per_unit) > 0;
}

const calculate_discount = (quantity, price_per_unit) => {
    const total_amount = quantity*price_per_unit;
    let discount = 0;
    if(total_amount > 10000) discount += (total_amount*0.10)
    if(quantity > 5) discount += 500

    return discount;
}

module.exports = { orders, validate_order, calculate_discount }