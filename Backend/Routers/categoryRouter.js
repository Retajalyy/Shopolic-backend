const express = require('express');
const router = express.Router();
const { authMW } = require('../Utilities/auth');
const categoryController = require('../Controllers/categoryController');

// Create category
router.post('/', authMW, categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getCategories);

// Get category by ID
router.get('/:id', categoryController.getCategoryById);

// Update category
router.put('/:id', authMW, categoryController.updateCategory);

// Delete category
router.delete('/:id', authMW, categoryController.deleteCategory);

module.exports = router;
