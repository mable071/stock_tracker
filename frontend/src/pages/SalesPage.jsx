import React, { useState, useEffect } from 'react';
import SaleService from '../services/SaleService';
import AddSaleModal from '../components/modals/sales/AddSaleModal';
import UpdateSaleModal from '../components/modals/sales/UpdateSaleModal';
import DeleteSaleModal from '../components/modals/sales/DeleteSaleModal';

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await SaleService.getAllSales();
      setSales(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch sales. Please try again later.');
      console.error('Error fetching sales:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const handleAddSuccess = () => {
    fetchSales();
    setShowAddModal(false);
  };

  const handleUpdateSuccess = () => {
    fetchSales();
    setShowUpdateModal(false);
    setSelectedSale(null);
  };

  const handleDeleteSuccess = () => {
    fetchSales();
    setShowDeleteModal(false);
    setSelectedSale(null);
  };

  const handleEdit = (sale) => {
    setSelectedSale(sale);
    setShowUpdateModal(true);
  };

  const handleDelete = (sale) => {
    setSelectedSale(sale);
    setShowDeleteModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.quantity * item.unitPrice), 0);
  };

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
            onClick={fetchSales}
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Sale
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sale #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{sale.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{sale.customerName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(sale.saleDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${calculateTotal(sale.items).toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      sale.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : sale.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(sale)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sale)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSaleModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />

      {selectedSale && (
        <>
          <UpdateSaleModal
            isOpen={showUpdateModal}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedSale(null);
            }}
            onSuccess={handleUpdateSuccess}
            saleId={selectedSale.id}
          />

          <DeleteSaleModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedSale(null);
            }}
            onSuccess={handleDeleteSuccess}
            saleId={selectedSale.id}
            saleNumber={selectedSale.id}
          />
        </>
      )}
    </div>
  );
};

export default SalesPage; 