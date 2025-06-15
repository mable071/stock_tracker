import React from 'react';
import ConfirmModal from '../ConfirmModal';
import ProductService from '../../../services/ProductService';

const DeleteProductModal = ({ isOpen, onClose, onSuccess, productId, productName }) => {
  const handleConfirm = async () => {
    try {
      await ProductService.deleteProduct(productId);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Product"
      message={`Are you sure you want to delete the product "${productName}"? This action cannot be undone.`}
      onConfirm={handleConfirm}
      confirmLabel="Delete"
      cancelLabel="Cancel"
    />
  );
};

export default DeleteProductModal; 