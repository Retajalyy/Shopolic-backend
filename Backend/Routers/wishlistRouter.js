const express = require('express');
const auth = require('../Utilities/auth');
const wishlistController = require('../Controllers/wishlistController');

const router = express.Router();

// All wishlist routes need authentication
router.post('/add', auth.authMW, wishlistController.addToWishlist);           // Add product to wishlist
router.get('/', auth.authMW, wishlistController.getWishlist);                 // Get user's wishlist
router.delete('/remove/:productId', auth.authMW, wishlistController.removeFromWishlist); // Remove product from wishlist

module.exports = router;
