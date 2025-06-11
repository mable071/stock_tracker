const  Sale  = require('../models/Sale');

exports.create = async (req, res) => {
  try {
    const { quantity_sold, sale_price, ...rest } = req.body;
    const sale = await Sale.create({
      ...rest,
      quantity_sold,
      sale_price,
      total_price: (quantity_sold * sale_price).toFixed(2),
    });
    res.status(201).json(sale);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findAll = async (req, res) => {
  try {
    const sales = await Sale.findAll({ include: ['Product', 'User'] });
    res.status(200).json(sales);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findOne = async (req, res) => {
  try {
    const sale = await Sale.findByPk(req.params.id, { include: ['Product', 'User'] });
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ error: 'Sale not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const { quantity_sold, sale_price, ...rest } = req.body;
    const updateData = { ...rest };
    if (quantity_sold && sale_price) {
      updateData.quantity_sold = quantity_sold;
      updateData.sale_price = sale_price;
      updateData.total_price = (quantity_sold * sale_price).toFixed(2);
    }
    const [updated] = await Sale.update(updateData, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSale = await Sale.findByPk(req.params.id, { include: ['Product', 'User'] });
      res.status(200).json(updatedSale);
    } else {
      res.status(404).json({ error: 'Sale not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Sale.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Sale not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};