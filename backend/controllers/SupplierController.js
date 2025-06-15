const Supplier = require('../models/Supplier');

exports.create = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findAll = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.status(200).json(suppliers);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.findOne = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const [updated] = await Supplier.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSupplier = await Supplier.findByPk(req.params.id);
      res.status(200).json(updatedSupplier);
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Supplier.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Supplier not found' });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};