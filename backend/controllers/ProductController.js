const Product  = require('../models/Product');

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.create(req.body);
    
    res.status(201).json(product);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll({ include: ['SubCategory'] });
    res.status(200).json(products);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: ['SubCategory'] });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id, { include: ['SubCategory'] });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};