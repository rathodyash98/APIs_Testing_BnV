const { orders, validate_order, calculate_discount } = require('../utils/index')

let curr_order_id = Math.max(...orders.map(order => order.id)) + 1;

// @desc    Get orders
// @route   GET /api/orders
// @access  Public
const get_order = (req, res) => {
    const id = req.params.id;
    if(id){
        const order = orders.find((order) => (Number(order.id) === Number(id)));
        if(!order){
            throw new Error(`Order Not Found - ${id}`);
        }
        else{
            return res.status(200).json(order);
        }
    }
    else{
        return res.status(200).json(orders);
    }
}


// @desc    Get all orders total revenue
// @route   GET /api/orders/total-revenue
// @access  Public
const get_orders_total_revenue = (req, res) => {
    let total_revenue = orders.reduce((accumulator, order) => accumulator + (order.total_amount - order.discount), 0);
    let total_orders = orders.length;

    return res.status(200).json({total_orders, total_revenue});
}


// @desc    Post orders
// @route   POST /api/orders
// @access  Public
const post_order = (req, res) => {
    const { product_name, quantity, price_per_unit } = req.body;

    if(!validate_order(product_name, quantity, price_per_unit)){
        throw new Error('Invalid Order - non-empty product_name or quantity or price must be > 0')
    }

    const order = {
        id: curr_order_id++,
        product_name,
        quantity,
        price_per_unit,
        total_amount: quantity*price_per_unit,
        discount: calculate_discount(quantity, price_per_unit),
        timestamp: new Date().toISOString(),
    }

    orders.push(order)

    return res.status(201).json({success: true, order});
}


module.exports = { get_order, get_orders_total_revenue, post_order }