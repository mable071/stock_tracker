import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import StockMovementsPage from './pages/StockMovementsPage';
import SalesPage from './pages/SalesPage';
import PurchasesPage from './pages/PurchasesPage';
import EmployeesPage from './pages/EmployeesPage';
import ReportsPage from './pages/ReportsPage';
import SuppliersPage from './pages/SuppliersPage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="stock-movements" element={<StockMovementsPage />} />
          <Route path="sales" element={<SalesPage />} />
          <Route path="purchases" element={<PurchasesPage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="suppliers" element={<SuppliersPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
