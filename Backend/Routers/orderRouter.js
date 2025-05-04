const express = require('express');
const auth = require('../Utilities/auth');
const orderController = require('../Controllers/orderController');

const router = express.Router();

// User actions
router.post('/', auth.authMW, orderController.placeOrder);            // Place an order
router.get('/my-orders', auth.authMW, orderController.getUserOrders); // Get user's own orders

// // Admin actions
// router.get('/', auth.authMW, auth.adminMW, orderController.getAllOrders); // Get all orders
// router.put('/status', auth.authMW, auth.adminMW, orderController.updateOrderStatus); // Update order status

module.exports = router;
