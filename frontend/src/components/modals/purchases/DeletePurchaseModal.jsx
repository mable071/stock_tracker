import React, { useState } from 'react';
import FormModal from '../FormModal';
import PurchaseService from '../../../services/PurchaseService';

const DeletePurchaseModal = ({ isOpen, onClose, onSuccess, purchaseId, purchaseNumber }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await PurchaseService.deletePurchase(purchaseId);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete purchase');
      console.error('Error deleting purchase:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Purchase"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitButtonText="Delete"
      submitButtonClass="bg-red-600 hover:bg-red-700"
    >
      <div className="text-center">
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete purchase #{purchaseNumber}? This action cannot be undone.
        </p>
        <p className="text-sm text-gray-500">
          Note: Deleting a purchase will not affect the inventory levels. If you want to adjust inventory,
          please use the stock movement feature instead.
        </p>
      </div>
    </FormModal>
  );
};

export default DeletePurchaseModal; 