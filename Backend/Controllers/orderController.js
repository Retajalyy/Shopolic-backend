const Order = require('../models/orderModel');
const Product = require('../Models/productModel');

exports.placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;
    const userId = req.user.id; 
    let totalAmount = 0;
    const orderProducts = [];

    
    for (let productItem of products) {
      const product = await Product.findById(productItem.product);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const price = product.price;
      const quantity = productItem.quantity;
      totalAmount += price * quantity;

      orderProducts.push({
        product: productItem.product,
        quantity,
        price,
      });
    }

    
    const order = new Order({
      user: userId,
      products: orderProducts,
      totalAmount,
      shippingAddress,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in the request (e.g., from JWT)

    const orders = await Order.find({ user: userId }).populate('products.product');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
//for admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    if (!['Pending', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true } 
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
