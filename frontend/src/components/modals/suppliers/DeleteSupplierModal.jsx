import React, { useState } from 'react';
import FormModal from '../FormModal';
import SupplierService from '../../../services/SupplierService';

const DeleteSupplierModal = ({ isOpen, onClose, onSuccess, supplierId, supplierName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await SupplierService.deleteSupplier(supplierId);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete supplier');
      console.error('Error deleting supplier:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Supplier"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      submitButtonText="Delete"
      submitButtonClass="bg-red-600 hover:bg-red-700"
    >
      <div className="text-center">
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete supplier "{supplierName}"? This action cannot be undone.
        </p>
        <p className="text-sm text-gray-500">
          Note: If this supplier has associated purchases, you may want to update those purchases first.
        </p>
      </div>
    </FormModal>
  );
};

export default DeleteSupplierModal; 