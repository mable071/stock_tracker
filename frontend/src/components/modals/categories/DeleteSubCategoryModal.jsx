import React from 'react';
import ConfirmModal from '../ConfirmModal';
import SubCategoryService from '../../../services/SubCategoryService';

const DeleteSubCategoryModal = ({ isOpen, onClose, onSuccess, subCategoryId, subCategoryName }) => {
  const handleConfirm = async () => {
    try {
      await SubCategoryService.deleteSubCategory(subCategoryId);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Subcategory"
      message={`Are you sure you want to delete the subcategory "${subCategoryName}"? This action cannot be undone and will affect all associated products.`}
      onConfirm={handleConfirm}
      confirmLabel="Delete"
      cancelLabel="Cancel"
    />
  );
};

export default DeleteSubCategoryModal; 