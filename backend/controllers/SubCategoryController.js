const  SubCategory  = require('../models/SubCategory');

exports.create = async (req, res) => {
  try {
    const subCategory = await SubCategory.create(req.body);
    res.status(201).json(subCategory);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findAll = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll({ include: ['MainCategory'] });
    res.status(200).json(subCategories);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findOne = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id, { include: ['MainCategory'] });
    if (subCategory) {
      res.status(200).json(subCategory);
    } else {
      res.status(404).json({ error: 'SubCategory not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await SubCategory.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSubCategory = await SubCategory.findByPk(req.params.id, { include: ['MainCategory'] });
      res.status(200).json(updatedSubCategory);
    } else {
      res.status(404).json({ error: 'SubCategory not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await SubCategory.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'SubCategory not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};