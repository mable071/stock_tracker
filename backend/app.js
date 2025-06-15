const express = require('express');
const cors = require('cors')
const morgan = require('morgan')

const { validationResult } = require('express-validator');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/userRoutes');
const mainCategoryRoutes = require('./routes/mainCategoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const saleRoutes = require('./routes/saleRoutes');
const stockMovementRoutes = require('./routes/stockMovementRoutes');
const supplierRoutes = require('./routes/supplierRoutes'); // Add this line
const sequelize = require('./config/database');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/main-categories', mainCategoryRoutes);
app.use('/api/sub-categories', subCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/stock-movements', stockMovementRoutes);
app.use('/api/suppliers', supplierRoutes); // Add this line

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ alter:true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
});