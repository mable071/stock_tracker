const express = require('express');
const router = express.Router();
const SubCategoryController = require('../controllers/SubCategoryController');
const subCategoryValidator = require('../validators/subCategoryValidator');

router.post('/', subCategoryValidator.createSubCategory, SubCategoryController.create);
router.get('/', SubCategoryController.findAll);
router.get('/:id', SubCategoryController.findOne);
router.put('/:id', subCategoryValidator.updateSubCategory, SubCategoryController.update);
router.delete('/:id', SubCategoryController.delete);

module.exports = router;