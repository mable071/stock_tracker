const express = require('express');
const { validationResult } = require('express-validator');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');
const mainCategoryRoutes = require('./routes/mainCategoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const saleRoutes = require('./routes/saleRoutes');
const stockMovementRoutes = require('./routes/stockMovementRoutes');
const sequelize = require('./config/database');

const app = express();

app.use(express.json());

// Validation middleware
app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/main-categories', mainCategoryRoutes);
app.use('/api/sub-categories', subCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/stock-movements', stockMovementRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
});