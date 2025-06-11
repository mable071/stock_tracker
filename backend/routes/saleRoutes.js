const express = require('express');
const router = express.Router();
const SaleController = require('../controllers/SaleController');
const saleValidator = require('../validators/saleValidator');

router.post('/', saleValidator.createSale, SaleController.create);
router.get('/', SaleController.findAll);
router.get('/:id', SaleController.findOne);
router.put('/:id', saleValidator.updateSale, SaleController.update);
router.delete('/:id', SaleController.delete);

module.exports = router;