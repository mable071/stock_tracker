const express = require('express');
const router = express.Router();
const MainCategoryController = require('../controllers/MainCategoryController');
const mainCategoryValidator = require('../validators/mainCategoryValidator');

router.post('/', mainCategoryValidator.createMainCategory, MainCategoryController.create);
router.get('/', MainCategoryController.findAll);
router.get('/:id', MainCategoryController.findOne);
router.put('/:id', mainCategoryValidator.updateMainCategory, MainCategoryController.update);
router.delete('/:id', MainCategoryController.delete);

module.exports = router;