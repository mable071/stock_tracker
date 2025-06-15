import React from 'react';
import ConfirmModal from '../ConfirmModal';
import MainCategoryService from '../../../services/MainCategoryService';

const DeleteMainCategoryModal = ({ isOpen, onClose, onSuccess, categoryId, categoryName }) => {
  const handleConfirm = async () => {
    try {
      await MainCategoryService.deleteCategory(categoryId);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error deleting main category:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Main Category"
      message={`Are you sure you want to delete the main category "${categoryName}"? This action cannot be undone and will also delete all associated subcategories.`}
      onConfirm={handleConfirm}
      confirmLabel="Delete"
      cancelLabel="Cancel"
    />
  );
};

export default DeleteMainCategoryModal; 