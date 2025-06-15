import React, { useState, useEffect } from 'react';
import StockMovementService from '../services/StockMovementService';
import AddStockMovementModal from '../components/modals/stock/AddStockMovementModal';
import UpdateStockMovementModal from '../components/modals/stock/UpdateStockMovementModal';
import DeleteStockMovementModal from '../components/modals/stock/DeleteStockMovementModal';

const StockMovementsPage = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchMovements = async () => {
    try {
      setLoading(true);
      const response = await StockMovementService.getAllMovements();
      setMovements(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch stock movements. Please try again later.');
      console.error('Error fetching stock movements:', err);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchMovements();
  }, []);

  const handleAddSuccess = () => {
    fetchMovements();
    setShowAddModal(false);
  };

  const handleUpdateSuccess = () => {
    fetchMovements();
    setShowUpdateModal(false);
    setSelectedMovement(null);
  };

  const handleDeleteSuccess = () => {
    fetchMovements();
    setShowDeleteModal(false);
    setSelectedMovement(null);
  };

  const handleEdit = (movement) => {
    setSelectedMovement(movement);
    setShowUpdateModal(true);
  };

  const handleDelete = (movement) => {
    setSelectedMovement(movement);
    setShowDeleteModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getMovementTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'in':
        return 'bg-green-100 text-green-800';
      case 'out':
        return 'bg-red-100 text-red-800';
      case 'adjustment':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            onClick={fetchMovements}
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
        <h1 className="text-2xl font-bold text-gray-900">Stock Movements</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Movement
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Movement #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">#{movement.id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{movement.productName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getMovementTypeColor(
                      movement.type
                    )}`}
                  >
                    {movement.type.charAt(0).toUpperCase() + movement.type.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{movement.quantity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{formatDate(movement.movementDate)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{movement.reference}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(movement)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movement)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddStockMovementModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={handleAddSuccess}
      />

      {selectedMovement && (
        <>
          <UpdateStockMovementModal
            isOpen={showUpdateModal}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedMovement(null);
            }}
            onSuccess={handleUpdateSuccess}
            movementId={selectedMovement.id}
          />

          <DeleteStockMovementModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setSelectedMovement(null);
            }}
            onSuccess={handleDeleteSuccess}
            movementId={selectedMovement.id}
            movementNumber={selectedMovement.id}
          />
        </>
      )}
    </div>
  );
};

export default StockMovementsPage; 