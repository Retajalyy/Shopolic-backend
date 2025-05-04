const productModel = require('../Models/productModel');

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    req.body.image = req.file.filename; // Save the uploaded image's filename into the request body
    const product = await productModel.create(req.body); // Create a new product in the database
    res.status(201).json(product); // Respond with the created product and a 201 status
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find(); // Fetch all products from the database
    res.status(200).json(products); // Respond with the list of products and a 200 status
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the URL params
    const updatedData = req.body;

    // Check if an image was uploaded, and update the image filename in the request body
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const product = await productModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product); // Respond with the updated product
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the URL params
    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product); // Respond with the product details
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Get the product ID from the URL params

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' }); // Respond with success message
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

