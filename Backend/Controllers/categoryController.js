const Category = require("../Models/categoryModel");

// Create a new category
exports.createCategory = async (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const savedCategory = await Category.create({ name: req.body.name });
    res.status(201).json(savedCategory);
  } catch (err) {
    console.error("Error creating category:", err.message);
    res.status(500).json({ error: "Failed to create category" });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: "New category name is required" });

  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category updated", category: updated });
  } catch (err) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};
