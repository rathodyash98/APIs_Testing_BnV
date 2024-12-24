const router = require('express').Router()
const { get_order, get_orders_total_revenue, post_order } = require('../controllers/orderController')

router.get('/orders', get_order)

router.get('/orders/:id', get_order)

router.get('/total-revenue', get_orders_total_revenue)

router.post('/orders', post_order)

module.exports = router