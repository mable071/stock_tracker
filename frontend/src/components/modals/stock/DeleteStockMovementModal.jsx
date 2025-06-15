import React, { useState } from 'react';
import FormModal from '../FormModal';
import StockMovementService from '../../../services/StockMovementService';

const DeleteStockMovementModal = ({ isOpen, onClose, onSuccess, stockMovementId, movementType }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await StockMovementService.deleteStockMovement(stockMovementId);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete stock movement');
      console.error('Error deleting stock movement:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Stock Movement"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitButtonText="Delete"
      submitButtonClass="bg-red-600 hover:bg-red-700"
    >
      <div className="text-center">
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete this {movementType?.toLowerCase()} movement? This action cannot be undone.
        </p>
      </div>
    </FormModal>
  );
};

export default DeleteStockMovementModal; 