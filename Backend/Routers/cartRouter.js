const express = require('express');
const auth = require('../Utilities/auth');
const cartController = require('../Controllers/cartController');

const router = express.Router();

// All cart routes need authentication
router.post('/add', auth.authMW, cartController.addToCart);          // Add product to cart
router.get('/', auth.authMW, cartController.getCart);               // View cart
router.delete('/remove', auth.authMW, cartController.removeFromCart); // Remove one product
router.delete('/clear', auth.authMW, cartController.clearCart);       // Clear entire cart

module.exports = router;
