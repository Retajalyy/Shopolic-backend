const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel');

exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body; // product ID to be added to wishlist
    const userId = req.user.id; // assuming user ID is in the request (e.g., from JWT)

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: userId });

    // If the wishlist doesn't exist, create a new one
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [productId] });
      await wishlist.save();
    } else {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      wishlist.products.push(productId);
      await wishlist.save();
    }

    res.status(201).json({ message: 'Product added to wishlist', wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.user.id; 


    const wishlist = await Wishlist.findOne({ user: userId }).populate('products');
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params; 
    const userId = req.user.id; 

    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const productIndex = wishlist.products.indexOf(productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    wishlist.products.splice(productIndex, 1);
    await wishlist.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
