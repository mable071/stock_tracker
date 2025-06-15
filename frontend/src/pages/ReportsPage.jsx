import React, { useState, useEffect } from 'react';
import SaleService from '../services/SaleService';
import PurchaseService from '../services/PurchaseService';
import ProductService from '../services/ProductService';

const ReportsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [purchasesData, setPurchasesData] = useState(null);
  const [inventoryData, setInventoryData] = useState(null);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const [salesResponse, purchasesResponse, productsResponse] = await Promise.all([
        SaleService.getSalesReport(),
        PurchaseService.getPurchasesReport(),
        ProductService.getInventoryReport()
      ]);

      setSalesData(salesResponse);
      setPurchasesData(purchasesResponse);
      setInventoryData(productsResponse);
      setError(null);
    } catch (err) {
      setError('Failed to fetch report data. Please try again later.');
      console.error('Error fetching report data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button
            onClick={fetchReportData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales Overview Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">${salesData?.totalSales?.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number of Orders</p>
              <p className="text-2xl font-bold text-gray-900">{salesData?.totalOrders}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${salesData?.averageOrderValue?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Purchases Overview Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Purchases Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900">
                ${purchasesData?.totalPurchases?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Number of Orders</p>
              <p className="text-2xl font-bold text-gray-900">{purchasesData?.totalOrders}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${purchasesData?.averageOrderValue?.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Inventory Overview Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryData?.totalProducts}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryData?.lowStockItems}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Out of Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">{inventoryData?.outOfStockItems}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData?.topProducts?.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.unitsSold}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${product.revenue.toFixed(2)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage; 