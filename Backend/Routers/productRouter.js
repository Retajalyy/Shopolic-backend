const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../Controllers/productController');
const upload = require('../Utilities/multerConfig');

router.post('/upload',upload.single('image'),productController.createProduct);
router.get('/',productController.getProducts);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.get('/:id',productController.getProductById);
router.delete('/:id', productController.deleteProduct);

module.exports= router;