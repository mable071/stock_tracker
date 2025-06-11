const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/PurchaseController');
const purchaseValidator = require('../validators/purchaseValidator');

router.post('/', purchaseValidator.createPurchase, PurchaseController.create);
router.get('/', PurchaseController.findAll);
router.get('/:id', PurchaseController.findOne);
router.put('/:id', purchaseValidator.updatePurchase, PurchaseController.update);
router.delete('/:id', PurchaseController.delete);

module.exports = router;