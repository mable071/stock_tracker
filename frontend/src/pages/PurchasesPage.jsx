import React, { useState, useEffect } from 'react';
import PurchaseService from '../services/PurchaseService';
import AddPurchaseModal from '../components/modals/purchases/AddPurchaseModal';
import UpdatePurchaseModal from '../components/modals/purchases/UpdatePurchaseModal';
import DeletePurchaseModal from '../components/modals/purchases/DeletePurchaseModal';

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await PurchaseService.getAllPurchases();
      setPurchases(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch purchases. Please try again later.');
      console.error('Error fetching purchases:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleAddSuccess = () => {
    fetchPurchases();
    setShowAddModal(false);
  };

  const handleUpdateSuccess = () => {
    fetchPurchases();
    setShowUpdateModal(false);
    setSelectedPurchase(null);
  };

  const handleDeleteSuccess = () => {
    fetchPurchases();
    setShowDeleteModal(false);
    setSelectedPurchase(null);
  };

  const handleEdit = (purchase) => {
    setSelectedPurchase(purchase);
    setShowUpdateModal(true);
  };

  const handleDelete = (purchase) => {
    setSelectedPurchase(purchase);
    setShowDeleteModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Updated calculateTotal function for the new model structure
  const calculateTotal = (purchase) => {
    if (purchase.quantity_received && purchase.cost_per_unit) {
      return (purchase.quantity_received * purchase.cost_per_unit).toFixed(2);
    }
    // Use the getter method value if available
    return purchase.total_cost || '0.00';
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
            onClick={fetchPurchases}
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
        <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Purchase
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Purchase ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {purchase.id.substring(0, 8)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {purchase.Product?.name || 'Unknown Product'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {purchase.Supplier?.name || 'No Supplier'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{purchase.quantity_received}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${purchase.cost_per_unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${calculateTotal(purchase)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDate(purchase.created_at)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(purchase)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(purchase)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {purchases.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No purchases found. Click "Add Purchase" to create your first purchase.
          </div>
        )}
      </div>

      <AddPurchaseModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />

      {selectedPurchase && (
        <>
          <UpdatePurchaseModal
            isOpen={showUpdateModal}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedPurchase(null);
            }}
            onSuccess={handleUpdateSuccess}
            purchaseId={selectedPurchase.id}
          />

          <DeletePurchaseModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedPurchase(null);
            }}
            onSuccess={handleDeleteSuccess}
            purchaseId={selectedPurchase.id}
            purchaseNumber={selectedPurchase.id}
          />
        </>
      )}
    </div>
  );
};

export default PurchasesPage;