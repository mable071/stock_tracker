const  StockMovement  = require('../models/StockMovement');

exports.create = async (req, res) => {
  try {
    const stockMovement = await StockMovement.create(req.body);
    res.status(201).json(stockMovement);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findAll = async (req, res) => {
  try {
    const stockMovements = await StockMovement.findAll({ include: ['Product'] });
    res.status(200).json(stockMovements);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findOne = async (req, res) => {
  try {
    const stockMovement = await StockMovement.findByPk(req.params.id, { include: ['Product'] });
    if (stockMovement) {
      res.status(200).json(stockMovement);
    } else {
      res.status(404).json({ error: 'StockMovement not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await StockMovement.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedStockMovement = await StockMovement.findByPk(req.params.id, { include: ['Product'] });
      res.status(200).json(updatedStockMovement);
    } else {
      res.status(404).json({ error: 'StockMovement not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await StockMovement.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'StockMovement not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};