const express = require('express');
const router = express.Router();
const StockMovementController = require('../controllers/StockMovementController');
const stockMovementValidator = require('../validators/stockMovementValidator');

router.post('/', stockMovementValidator.createStockMovement, StockMovementController.create);
router.get('/', StockMovementController.findAll);
router.get('/:id', StockMovementController.findOne);
router.put('/:id', stockMovementValidator.updateStockMovement, StockMovementController.update);
router.delete('/:id', StockMovementController.delete);

module.exports = router;