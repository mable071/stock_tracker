const  Purchase  = require('../models/Purchase');

exports.create = async (req, res) => {
  try {
    const { quantity_received, cost_per_unit, ...rest } = req.body;
    const purchase = await Purchase.create({
      ...rest,
      quantity_received,
      cost_per_unit,
      total_cost: (quantity_received * cost_per_unit).toFixed(2),
    });
    res.status(201).json(purchase);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findAll = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({ include: ['Product'] });
    res.status(200).json(purchases);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findOne = async (req, res) => {
  try {
    const purchase = await Purchase.findByPk(req.params.id, { include: ['Product'] });
    if (purchase) {
      res.status(200).json(purchase);
    } else {
      res.status(404).json({ error: 'Purchase not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { quantity_received, cost_per_unit, ...rest } = req.body;
    const updateData = { ...rest };
    if (quantity_received && cost_per_unit) {
      updateData.quantity_received = quantity_received;
      updateData.cost_per_unit = cost_per_unit;
      updateData.total_cost = (quantity_received * cost_per_unit).toFixed(2);
    }
    const [updated] = await Purchase.update(updateData, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPurchase = await Purchase.findByPk(req.params.id, { include: ['Product'] });
      res.status(200).json(updatedPurchase);
    } else {
      res.status(404).json({ error: 'Purchase not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Purchase.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Purchase not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};