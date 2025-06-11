const  MainCategory  = require('../models/MainCategory');

exports.create = async (req, res) => {
  try {
    const mainCategory = await MainCategory.create(req.body);
    res.status(201).json(mainCategory);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findAll = async (req, res) => {
  try {
    const mainCategories = await MainCategory.findAll();
    res.status(200).json(mainCategories);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findOne = async (req, res) => {
  try {
    const mainCategory = await MainCategory.findByPk(req.params.id);
    if (mainCategory) {
      res.status(200).json(mainCategory);
    } else {
      res.status(404).json({ error: 'MainCategory not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await MainCategory.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedMainCategory = await MainCategory.findByPk(req.params.id);
      res.status(200).json(updatedMainCategory);
    } else {
      res.status(404).json({ error: 'MainCategory not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await MainCategory.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'MainCategory not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};