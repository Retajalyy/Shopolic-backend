const cartModel = require('../Models/cartModel'); 

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id; 

        let cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            // If cart doesn't exist, create a new one
            cart = await cartModel.create({
                user: userId,
                products: [{ product: productId, quantity }]
            });
        } else {
            // If cart exists, check if product already in cart
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

            if (productIndex > -1) {
                // If product exists, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // If product does not exist, add to products array
                cart.products.push({ product: productId, quantity });
            }

            await cart.save();
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get cart for a user
exports.getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await cartModel.findOne({ user: userId }).populate('products.product');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        let cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        const userId = req.user._id;

        let cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.products = []; // Empty the cart
        await cart.save();

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

