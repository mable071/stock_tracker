import React from 'react';
import ConfirmModal from '../ConfirmModal';
import SaleService from '../../../services/SaleService';

const DeleteSaleModal = ({ isOpen, onClose, onSuccess, saleId, saleNumber }) => {
  const handleConfirm = async () => {
    try {
      await SaleService.cancelSale(saleId, 'Cancelled by user');
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error cancelling sale:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Sale"
      message={`Are you sure you want to cancel sale #${saleNumber}? This action cannot be undone and will affect inventory levels.`}
      onConfirm={handleConfirm}
      confirmLabel="Cancel Sale"
      cancelLabel="Keep Sale"
    />
  );
};

export default DeleteSaleModal; 