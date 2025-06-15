const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/SupplierController');
const supplierValidator = require('../validators/supplierValidator');

router.get('/', SupplierController.findAll);
router.get('/:id', SupplierController.findOne);
router.post('/', supplierValidator.createSupplier, SupplierController.create);
router.put('/:id', supplierValidator.updateSupplier, SupplierController.update);
router.delete('/:id', SupplierController.delete);

module.exports = router;