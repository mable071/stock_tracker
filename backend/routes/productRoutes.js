const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const productValidator = require('../validators/productValidator');

router.post('/', productValidator.createProduct, ProductController.create);
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.put('/:id', productValidator.updateProduct, ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;